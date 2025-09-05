import { testMail } from "../utils/testEmail.js"
import transporter from "../config/nodeMailer.js"
import { tryCatchWrapper } from "../errorHandler/tryCatchWraper.js";
import { generateWelcomeEmail, generateResetOtpEmail } from "../utils/emailTemplates.js";
import { createNewUser, loginUser, sendResetOtp_to_email, resetPassword, sendVerification_Email, verifyEmailOtp, getUserById } from "../utils/auth.utils.js";
import { decodeIdFromToken } from "../utils/generateTokens.js"

export const register = tryCatchWrapper(async (req, res) => {
    const { name: rawName, email: rawEmail, password } = req.body;
    const name = rawName?.trim();
    const email = rawEmail?.trim().toLowerCase();
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }
    if (name.length > 100) {
        return res.status(400).json({
            success: false,
            message: "Name cannot be more than 100 characters."
        })
    }
    if (password.length > 25 || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password cannot be of less than 6 characters and more than 25 characters."
        })
    }
    if (!testMail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }
    const newUser = await createNewUser(name, email, password, res)
    const mailOptions = generateWelcomeEmail(name, email);
    try {
        await transporter.sendMail(mailOptions);
    } catch (emailError) {
        console.warn("Welcome email failed:", emailError?.message || emailError);
        // Continue without blocking user registration
    }

    res.status(201).cookie("token", newUser.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        token: newUser.token,
        data: newUser.data
    });
})

export const login = tryCatchWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }
    const loggedInUser = await loginUser(email, password, res)
    res.status(200).cookie("token", loggedInUser.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        token: loggedInUser.token,
        data: loggedInUser.data
    })
})

export const logout = tryCatchWrapper(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 0,
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully."
    })
})

export const sendResetOtp = tryCatchWrapper(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required."
        })
    }
    const resetOtp = await sendResetOtp_to_email(email)
    const mailOptions = generateResetOtpEmail(email, resetOtp.otp)
    try {
        await transporter.sendMail(mailOptions);
    } catch (emailError) {
        throw new Error("Failed to send reset OTP to email.")
    }
    res.status(200).json({
        success: true,
        message: resetOtp.message
    })
})

export const changePassword = tryCatchWrapper(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        })
    }
    if (newPassword.length > 25 || newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password cannot be of less than 6 characters and more than 25 characters."
        })
    }
    if (!testMail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email address."
        });
    }
    const verifiedResetOtp = await resetPassword(email, otp, newPassword)
    res.status(200).json({
        success: true,
        message: verifiedResetOtp.message
    })
})

export const sendVerificationEmail = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    const verifiedEmail = await sendVerification_Email(id)
    res.status(200).json({
        success: true,
        message: verifiedEmail.message
    })
})

export const verifyEmail = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized. Please login again."
        })
    }
    const otp = req.body.otp
    const id = decodeIdFromToken(token)
    const verifiedOtp = await verifyEmailOtp(id, otp)
    res.status(200).json({
        success: true,
        message: verifiedOtp.message
    })
})

export const getUser = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    const user = await getUserById(id)
    res.status(200).json({
        success: true,
        data: user
    })
})

export const isAuthenticated = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided."
        })
    }

    try {
        const id = decodeIdFromToken(token)
        const user = await getUserById(id)

        if (user && user._id.toString() === id.toString()) {
            return res.status(200).json({
                success: true,
                message: "User is authenticated.",
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isAccountVerified: user.isAccountVerified
                }
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid token."
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed."
        })
    }
})