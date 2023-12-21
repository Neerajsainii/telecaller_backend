import mongoose from "mongoose";

export const subAdmin = new mongoose.model("subAdmin", new mongoose.Schema({
    userName: { type:String, required: true},
    password: { type:String,required: true}
}), 'subAdmin');

