import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";
import { subAdmin } from "../models/subadmin.models.js";
import { numberBoy } from "../models/numberBoy.models.js";
import { telecaller } from "../models/telecaller.models.js";



export const AdminController = {
    createAdmin: async (data) => {
        const existingAdmin = await Admin.findOne({ userName: data.userName, password: data.password })
        if (existingAdmin) {
            throw { message: "Admin already exist" }
        }
        if (!data.userName) {
            throw { message: "Username is required" }
        }
        if (!data.password) {
            throw { message: "Invalid password" }
        }
        const Passwordsalt = await bcrypt.genSalt();
        const ecncryptedPassword = await bcrypt.hash(data.password, Passwordsalt);
        const newAdmin = new Admin({
            userName: data.userName,
            password: ecncryptedPassword
        });
        newAdmin.save().catch((err) => {
            throw (err)
        });
    },

    generateAdminAccessToken: async (userName, password, persist) => {


        // console.log("password",pa?ssword)
        // console.log("userName",userName)
        if (!userName) {
            throw { message: "Invalid username" }
        }
        if (!password) {
            throw { message: "Invalid pasword" }
        }

        const existinguser = await Admin.findOne({ userName: userName })
        if (!existinguser) {
            throw { message: "invalid Credentials" }
        }
        const validPassword = await bcrypt.compare(password, existinguser.password);
        if (!validPassword) {
            throw { message: "Invalid credentials" }
        }
        // console.log("password....",password)
        const accessTokenresponse = {
            id: existinguser._id,
            userName: existinguser.userName
        };
        const accessToken = jwt.sign(
            accessTokenresponse,
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: persist ? "1d" : "10h",
            }
        );

        return {
            userName: existinguser.userName,
            accessToken: accessToken
        };

    },
    createsubAdmin: async (data) => {
        const existingsubAdmin = await subAdmin.findOne({ userName: data.userName, password: data.password })
        if (existingsubAdmin) {
            throw { message: "subAdmin already exist" }
        }
        if (!data.userName) {
            throw { message: "Username is required" }
        }
        if (!data.password) {
            throw { message: "Invalid password" }
        }
        const Passwordsalt = await bcrypt.genSalt();
        const ecncryptedPassword = await bcrypt.hash(data.password, Passwordsalt);
        const newsubAdmin = new subAdmin({
            userName: data.userName,
            password: ecncryptedPassword
        });
        newsubAdmin.save().catch((err) => {
            throw (err)
        });
    },
    createnumberBoy: async (data) => {
        const existingnumberBoy = await numberBoy.findOne({ userName: data.userName, password: data.password })
        if (existingnumberBoy) {
            throw { message: "numberBoy already exist" }
        }
        if (!data.userName) {
            throw { message: "Username is required" }
        }
        if (!data.password) {
            throw { message: "Invalid password" }
        }
        const Passwordsalt = await bcrypt.genSalt();
        const ecncryptedPassword = await bcrypt.hash(data.password, Passwordsalt);
        const newnumberBoy = new numberBoy({
            userName: data.userName,
            password: ecncryptedPassword
        });
        newnumberBoy.save().catch((err) => {
            throw (err)
        });
    },
    createTelecaller: async (data) => {
        const existingTelecaller = await telecaller.findOne({ userName: data.userName, password: data.password })
        if (existingTelecaller) {
            throw { message: "Telecaller already exist" }
        }
        if (!data.userName) {
            throw { message: "Username is required" }
        }
        if (!data.password) {
            throw { message: "Invalid password" }
        }
        const Passwordsalt = await bcrypt.genSalt();
        const ecncryptedPassword = await bcrypt.hash(data.password, Passwordsalt);
        const newTelecaller = new telecaller({
            userName: data.userName,
            password: ecncryptedPassword
        });
        newTelecaller.save().catch((err) => {
            throw (err)
        });
    },
    sendNumbersToTelecaller: async (userName, freshNewNums, freshOldNums) => {
        try {
            const telecaller = await Telecaller.findOne({ userName: userName }).exec();
            if (!telecaller) {
                throw { code: 404, message: "Telecaller not found" };
            }

            const selectedNumbers = await NumberSchema.find({
                'newNumber.freshNewNum': { $in: freshNewNums },
                'oldNumber.freshOldNum': { $in: freshOldNums }
            }).exec();

            if (selectedNumbers.length === 0) {
                throw { code: 404, message: "Numbers do not exist" };
            }

            const assignedNumbers = selectedNumbers.map(number => ({
                newNumbers: {
                    freshNewNum: number.newNumber.freshNewNum,
                    callHistory: []
                },
                oldNumbers: {
                    freshOldNum: number.oldNumber.freshOldNum,
                    callHistory: []
                }
            }));

            telecaller.assignedNumbers = telecaller.assignedNumbers.concat(assignedNumbers);

            await telecaller.save();

            return "Numbers assigned to the telecaller";
        } catch (error) {
            throw error;
        }
    }
}