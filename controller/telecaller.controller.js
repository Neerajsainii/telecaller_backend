import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { telecaller } from "../models/telecaller.models.js";

export const TelecallerController = {


    generateTelecallerAccessToken: async (userName, password, persist) => {


        // console.log("password",pa?ssword)
        // console.log("userName",userName)
        if (!userName) {
            throw { message: "Invalid username" }
        }
        if (!password) {
            throw { message: "Invalid pasword" }
        }

        const existinguser = await telecaller.findOne({ userName: userName })
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
    updateNumberAfterCall: async (telecallerUserName, phoneNumber, isInterested, purchase, remarks) => {
        try {
            const telecaller = await Telecaller.findOne({ userName: telecallerUserName }).exec();
            if (!telecaller) {
                throw { code: 404, message: "Telecaller not found" };
            }

            if (!remarks) {
                throw { code: 400, message: "Remarks field is required" };
            }

            if (typeof isInterested !== 'boolean') {
                throw { code: 400, message: "isInterested field must be a boolean" };
            }

            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleTimeString();
            let numberToUpdateContainer = null;

            for (const numberSet of telecaller.assignedNumbers) {
                for (const numberContainer of numberSet.newNumbers) {
                    for (const number of numberContainer.freshNewNum) {
                        if (number == phoneNumber) {
                            numberToUpdateContainer = numberContainer;
                            break;
                        }
                    }
                }
            }

            if (!numberToUpdateContainer) {
                for (const numberSet of telecaller.assignedNumbers) {
                    for (const numberContainer of numberSet.oldNumbers) {
                        for (const number of numberContainer.freshOldNum) {
                            if (number == phoneNumber) {
                                numberToUpdateContainer = numberContainer;
                                break;
                            }
                        }
                    }
                }
            }

            if (!numberToUpdateContainer) {
                throw { code: 404, message: "Number not found" };
            }

            if (!numberToUpdateContainer.callHistory) {
                numberToUpdateContainer.callHistory = [];
            }

            numberToUpdateContainer.callHistory.push({
                callTime: formattedTime,
                isInterested,
                purchase,
                remarks
            });

            await telecaller.save();

            const purchaseStatus = purchase ? "Purchased" : "Not Purchased";

            return `Number record updated after the call. Purchase Status: ${purchaseStatus}`;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}