import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ArrowRight, Shield } from "lucide-react";
import { useUserContext } from "../../context/UserContext";

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const { user, isLoading, verifyEmail, resendVerifyEmailOtp, isOtpSent, sendVerifyEmailOtp } = useUserContext();
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await verifyEmail(otp);
    };

    const handleResendOtp = () => {
        resendVerifyEmailOtp();
    };

    useEffect(() => {
        if (user && !user.isAccountVerified) {
            if(!isOtpSent){
                sendVerifyEmailOtp();
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12 pt-32">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-300">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* OTP Input */}
                            <div className="relative">
                                <label
                                    htmlFor="otp"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-center text-2xl tracking-widest"
                                        placeholder="000000"
                                        maxLength="6"
                                        pattern="[0-9]{6}"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <span>
                                    {isLoading
                                        ? "Verifying..."
                                        : "Verify Email"}
                                </span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Resend OTP */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400 mb-3">
                                Didn't receive the code?
                            </p>
                            <button
                                onClick={handleResendOtp}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                            >
                                Resend Code
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Remember your password?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                            >
                                Back to Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
