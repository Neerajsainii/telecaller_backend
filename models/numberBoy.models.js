import mongoose from "mongoose";

export const numberBoy = new mongoose.model("numberBoy", new mongoose.Schema({
    userName: { type:String, required: true},
    password: { type:String,required: true},
    tokens: { ResetPassword: { type:String}}
}), 'numberBoy');

export const numbernewSchema = new mongoose.model("newNumber", new mongoose.Schema({
    newNum:{
        freshnewNum:{ type:Number },
        newRemark:{ type: String}
    }
}), 'newNumber');
export const numberoldSchema = new mongoose.model("oldNumber", new mongoose.Schema({
    oldNum:{
        fresholdNum:{type:Number},
        oldRemark:{type:String}
    }
}), 'oldNumber');