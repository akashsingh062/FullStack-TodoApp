import express from "express";
import {
    register,
    login,
    logout,
    sendResetOtp,
    changePassword,
    sendVerificationEmail,
    verifyEmail,
    getUser,
    isAuthenticated
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-reset-otp", sendResetOtp);
router.post("/change-password", changePassword);
router.post("/send-verification-email-otp", sendVerificationEmail);
router.post("/verify-email", verifyEmail);
router.get("/get-user", getUser);
router.get("/is-auth", isAuthenticated);


export default router;