import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { subAdmin } from "../models/subadmin.models.js";

export const subAdminController = {
    
    generatesubAdminAccessToken: async(userName,password,persist) =>{
        // console.log("password",pa?ssword)
        // console.log("userName",userName)
        if(!userName){
            throw{ message: "Invalid username"}
        }
        if(!password){
            throw{ message: "Invalid pasword" }
        }

        const existinguser = await subAdmin.findOne({userName: userName})
        if(!existinguser){
            throw {message: "invalid Credentials"}
        }
        const validPassword = await bcrypt.compare(password, existinguser.password);
        if (!validPassword){
            throw {message: "Invalid credentials"}
        }
        // console.log("password....",password)
        const accessTokenresponse = {
            id:existinguser._id,
            userName: existinguser.userName
        };
            accessTokenresponse,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: persist ? "1d": "10h",
            }

        return {
            userName: existinguser.userName,
            accessToken: accessToken
        };

    }
}