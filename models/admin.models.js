import mongoose from "mongoose";

export const Admin = new mongoose.model("Admin", new mongoose.Schema({
    userName: { type:String, required: true},
    password: { type:String,required: true},
    tokens: { ResetPassword: { type:String}}
    
}), 'Admin');
