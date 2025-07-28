import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import { generateToken } from "./generateTokens.js"
import { generateVerificationEmail } from "./emailTemplates.js"
import transporter from "../config/nodeMailer.js"

export async function createNewUser(name, email, password){
    const userExist = await User.findOne({ email })
    if (userExist) {
        throw new Error("User already exists.")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const new_user = await User.create({
        name, email, password: hashPassword
    })
    const token = generateToken(new_user._id)
    return {
        success: true,
        token,
        data: {
            name: new_user.name,
            email: new_user.email,
        }
    }
}

export async function loginUser(email, password){
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found.")
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials.")
    }
    const token = generateToken(user._id)
    return {
        success: true,
        token,
        data: {
            name: user.name,
            email: user.email,
        }
    }
}

export async function sendResetOtp_to_email(email){
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found.")
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpExpiration = Date.now() + 10 * 60 * 1000 //10 minutes
    const hashedOtp = await bcrypt.hash(otp, 10)
    user.resetOtp = hashedOtp
    user.resetOtpExpiration = otpExpiration
    await user.save()
    return {
        success: true,
        message: "Reset OTP sent successfully.",
        otp
    }
}

export async function resetPassword(email, otp, newPassword){
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found.")
    }
    const isOtpValid = await bcrypt.compare(otp, user.resetOtp)
    if (!isOtpValid) {
        throw new Error("Invalid OTP.")
    }
    if (user.resetOtpExpiration < Date.now()) {
        throw new Error("OTP expired.")
    }
    user.resetOtp = ""
    user.resetOtpExpiration = 0
    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()
    return {
        success: true,
        message: "Password reset successfully.",
    }
}

export async function sendVerification_Email(id){
    const user = await User.findById(id)
    if (!user) {
        throw new Error("User not found.")
    }
    if(user.isAccountVerified){
        throw new Error("Email already verified.")
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const otpExpiration = Date.now() + 10 * 60 * 1000 //10 minutes
    const hashedOtp = await bcrypt.hash(otp, 10)
    user.verificationOtp = hashedOtp
    user.verificationOtpExpiration = otpExpiration
    await user.save()
    const mailOptions = generateVerificationEmail(user.email, otp)
    try {
        await transporter.sendMail(mailOptions);
    } catch (emailError) {
        // Verification email failed to send - continue silently
    }
    return {
        success: true,
        message: "Verification email sent successfully.",
    }
}

export async function verifyEmailOtp(id, otp){
    const user = await User.findById(id)
    if (!user) {
        throw new Error("User not found.")
    }
    if(user.isAccountVerified){
        throw new Error("Email already verified.")
    }
    const isOtpValid = await bcrypt.compare(otp, user.verificationOtp)
    if(!isOtpValid){
        throw new Error("Invalid otp.")
    }
    if (user.verificationOtpExpiration < Date.now()) {
        throw new Error("OTP expired.")
    }
    user.verificationOtp = ""
    user.verificationOtpExpiration = 0
    user.isAccountVerified = true
    await user.save()
    return {
        success:true,
        message: "Email verified successfully.",
    }
}

export async function getUserById(id){
    const user = await User.findById(id)
    if (!user) {
        throw new Error("User not found.")
    }
    return user
}