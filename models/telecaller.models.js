import mongoose from "mongoose"

export const telecaller = new mongoose.model("telecaller", new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    asignedNumbers: [{
        newNumbers: [{
            number: { type: Number, ref: "Number" },
            callHistory: [{
                callTime: { type: String },
                isInterested: { type: Boolean, default: false },
                purchased: { type: String, default: "NA" },
                remark: { type: String }
            }]
        }],
        oldNumbers: [{
            number: { type: Number, ref: "Number" },
            callHistory: [{
                callTime: { type: String },
                isInterested: { type: Boolean, default: false },
                purchased: { type: String, default: "NA" },
                remark: { type: String }
            }]
        }]
    }]
}), 'telecaller'
);