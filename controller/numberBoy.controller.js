import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { numberBoy, numbernewSchema, numberoldSchema } from "../models/numberBoy.models.js";

export const numberBoyController = {
    

    generatenumberBoyAccessToken: async(userName,password,persist) =>{
       

        // console.log("password",pa?ssword)
        // console.log("userName",userName)
        if(!userName){
            throw{ message: "Invalid username"}
        }
        if(!password){
            throw{ message: "Invalid pasword" }
        }

        const existinguser = await numberBoy.findOne({userName: userName})
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
        const accessToken = jwt.sign(
            accessTokenresponse,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: persist ? "1d": "10h",
            }
        );

        return {
            userName: existinguser.userName,
            accessToken: accessToken
        };

    },
    createnewnum: async (freshnewNum, newRemark) => {
        try{
            const existingNum = await numbernewSchema.findOne({newNum: freshnewNum}); 
            console.log("existing",existingNum)
            if(existingNum){
                throw { message:" Number already exist"}
            }
            // console.log(newRemark)
            // console.log(oldRemark)
            if(!freshnewNum ){
                throw { message: "required number" }
            }
            if(!newRemark ){
                throw { message: "INvalid Remark" }
            }
            const Num = new numbernewSchema({
                newNum: {
                    freshnewNum,
                    newRemark
                }
            })
            await Num.save()
            return Num;

        }catch(err){
            throw err;
        }
    },
    createoldnum: async ( fresholdNum, oldRemark) => {
        try{
            const existingNum = await numberoldSchema.findOne({ oldNum: fresholdNum}); 
            console.log("existing",existingNum)
            if(existingNum){
                throw { message:" Number already exist"}
            }
            // console.log(newRemark)
            // console.log(oldRemark)
            if( !fresholdNum){
                throw { message: "required number" }
            }
            if(!oldRemark){
                throw { message: "INvalid Remark" }
            }
            const Num = new numberoldSchema({
                oldNum:{
                    fresholdNum,
                    oldRemark
                }
            })
            await Num.save()
            return Num;

        }catch(err){
            throw err;
        }
    }
}