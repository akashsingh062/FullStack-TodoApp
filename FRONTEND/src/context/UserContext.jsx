import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const requireAuth = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/api/v1/auth/is-auth`,
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                setIsLoggedIn(true);
                setUser(response.data.data);
                setIsEmailVerified(response.data.data.isAccountVerified);
                return true;
            } else {
                setIsLoggedIn(false);
                setUser("");
                navigate("/login");
                toast.error("Please login to continue.");
                return false;
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUser("");
            navigate("/login");
            toast.error("Please login to continue.");
            return false;
        }
    };

    const resendVerifyEmailOtp = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/send-verification-email-otp`,
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                setIsOtpSent(true);
                toast.success("OTP sent successfully.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const sendVerifyEmailOtp = async () => {
        try {
            setIsLoading(true);
            setIsOtpSent(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/send-verification-email-otp`,
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                setIsOtpSent(true);
                toast.success("OTP sent successfully.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsOtpSent(true);
            setIsLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );
            if (response.data.success) {
                setIsLoggedIn(true);
                setUser(response.data.data);
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            if (response.data.success) {
                setIsLoggedIn(true);
                setUser(response.data.data);
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/logout`,
                {
                    withCredentials: true,
                }
            );
            if (response.data.success) {
                setIsLoggedIn(false);
                setUser("");
                navigate("/");
                toast.success("Logged out successfully.");
            }
        } catch (error) {
            setIsLoggedIn(false);
            setUser("");
            navigate("/");
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const verifyEmail = async (otp) => {
        if (isEmailVerified) {
            toast.error("Email already verified.");
            return;
        }
        try {
            setIsLoading(true);
            setIsOtpSent(false);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/verify-email`,
                {
                    otp,
                }
            );
            if (response.data.success) {
                setIsLoggedIn(true);
                setUser(response.data.data);
                setIsEmailVerified(true);
                toast.success("Email verified successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const sendResetOtp = async (email) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/send-reset-otp`,
                {
                    email,
                }
            );
            if (response.data.success) {
                toast.success("OTP sent successfully.");
                setIsOtpSent(true);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsOtpSent(false);
            setIsLoading(false);
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/change-password`,
                {
                    email,
                    otp,
                    newPassword,
                }
            );
            if (response.data.success) {
                toast.success("Password reset successfully.");
                if (user) {
                    navigate("/dashboard");
                } else {
                    navigate("/login");
                }
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setIsOtpSent(false);
        }, 1000 * 60 * 10);
    }, [isOtpSent]);

    useEffect(() => {
        requireAuth();
    }, []);

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        logout,
        requireAuth,
        login,
        register,
        verifyEmail,
        resendVerifyEmailOtp,
        sendVerifyEmailOtp,
        isEmailVerified,
        setIsEmailVerified,
        sendResetOtp,
        resetPassword,
        isOtpSent,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
