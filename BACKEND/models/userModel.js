import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    resetOtp: {
        type: String,
        default: ""
    },
    resetOtpExpiration: {
        type: Date,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verificationOtp: {
        type: String,
        default: ""
    },
    verificationOtpExpiration: {
        type: Date,
        default: 0
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User