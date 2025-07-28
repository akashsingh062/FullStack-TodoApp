import React, { useState, useEffect } from "react";
import {
    CheckCircle,
    Menu,
    X,
    User,
    Search,
    ChevronDown,
    Mail,
    Lock,
    LogOut,
    Home,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const { isLoggedIn, logout, isEmailVerified, isOtpSent, setIsOtpSent } = useUserContext();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
                isScrolled
                    ? "py-3 backdrop-blur-3xl bg-black/60 border-b border-white/20 shadow-2xl shadow-purple-500/20"
                    : "py-6 backdrop-blur-2xl bg-black/30"
            }`}
        >
            {/* Simplified background for better performance */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center space-x-3 group cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div
                            className={`relative transition-all duration-500 ${
                                isHovered ? "scale-110 rotate-12" : ""
                            }`}
                        >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center relative">
                                <CheckCircle className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white drop-shadow-lg tracking-tight">
                                FullStack
                            </span>
                            <span className="text-xs text-blue-300 font-medium tracking-widest uppercase drop-shadow-md">
                                todo-app
                            </span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative flex items-center bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 group-hover:border-white/40 transition-all duration-300">
                                <Search className="w-5 h-5 text-gray-200 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent text-white placeholder-gray-300 outline-none w-48 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="hidden lg:flex items-center space-x-1">
                                {/* Profile Dropdown */}
                                <div className="relative group">
                                    <button
                                        className="flex items-center space-x-2 px-6 py-3 rounded-2xl text-white hover:text-blue-200 transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm border border-transparent hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/30 font-medium drop-shadow-sm"
                                        onClick={() =>
                                            setActiveDropdown(
                                                activeDropdown === 0 ? null : 0
                                            )
                                        }
                                        onMouseEnter={() =>
                                            setActiveDropdown(0)
                                        }
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="font-semibold drop-shadow-sm">
                                            Profile
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                activeDropdown === 0
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeDropdown === 0 && (
                                        <div
                                            className="absolute top-full left-0 mt-2 w-64 bg-black/80 backdrop-blur-3xl border border-white/30 rounded-2xl shadow-2xl shadow-purple-500/30 overflow-hidden z-50"
                                            onMouseLeave={() =>
                                                setActiveDropdown(null)
                                            }
                                        >
                                            <div className="p-2">
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-200 group font-medium"
                                                >
                                                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                        <Home className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">
                                                        Dashboard
                                                    </span>
                                                </Link>

                                                {!isEmailVerified && (
                                                    <Link 
                                                        onClick={() => setIsOtpSent(false)}
                                                        to="/verify-email"
                                                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-200 group font-medium"
                                                    >
                                                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                            <Mail className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium">
                                                            Verify Email
                                                        </span>
                                                    </Link>
                                                )}

                                                <Link
                                                    to="/reset-password"
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-200 group font-medium"
                                                >
                                                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                        <Lock className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">
                                                        Reset Password
                                                    </span>
                                                </Link>

                                                <Link
                                                    to="/logout"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        logout();
                                                    }}
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-200 group font-medium"
                                                >
                                                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                                        <LogOut className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">
                                                        Logout
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button
                                className="relative overflow-hidden px-6 py-3 bg-black/40 border-2 border-white/30 text-white rounded-2xl font-semibold hover:border-white/50 hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm"
                                onClick={() => navigate("/login")}
                            >
                                <span className="relative z-10 drop-shadow-sm">
                                    Login
                                </span>
                            </button>
                        )}

                        {/* Register Button */}
                        {!isLoggedIn && (
                            <button
                                className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 border border-white/20"
                                onClick={() => navigate("/register")}
                            >
                                <span className="relative z-10 drop-shadow-sm">
                                    Register
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative p-3 bg-black/50 backdrop-blur-sm border border-white/30 rounded-2xl text-white transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className="w-6 h-6 flex items-center justify-center">
                            <div
                                className={`transform transition-all duration-300 ${
                                    isMobileMenuOpen ? "rotate-45" : ""
                                }`}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
                    isMobileMenuOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="mt-4 mx-6 p-6 bg-black/70 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl">
                    {/* Mobile Search */}
                    <div className="mb-6">
                        <div className="relative flex items-center bg-black/50 border border-white/20 rounded-2xl px-4 py-3">
                            <Search className="w-5 h-5 text-gray-200 mr-3" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-white placeholder-gray-300 outline-none w-full font-medium"
                            />
                        </div>
                    </div>

                    {/* Mobile Navigation - Profile Section (only when logged in) */}
                    {isLoggedIn && (
                        <div className="space-y-2 mb-6">
                            <div>
                                <button
                                    className="flex items-center justify-between w-full px-4 py-3 rounded-2xl text-white hover:text-blue-200 hover:bg-white/20 transition-all duration-200 font-medium text-left"
                                    onClick={() =>
                                        setActiveDropdown(
                                            activeDropdown === 0 ? null : 0
                                        )
                                    }
                                >
                                    <div className="flex items-center space-x-3">
                                        <User className="w-4 h-4" />
                                        <span className="font-semibold">
                                            Profile
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${
                                            activeDropdown === 0
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {/* Mobile Profile Dropdown */}
                                {activeDropdown === 0 && (
                                    <div className="mt-2 ml-4 space-y-1">
                                        <Link
                                            to="/dashboard"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-200 font-medium"
                                        >
                                            <div className="text-blue-400">
                                                <Home className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">
                                                Dashboard
                                            </span>
                                        </Link>

                                        {!isEmailVerified && <Link
                                            to="/verify-email"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-200 font-medium"
                                        >
                                            <div className="text-blue-400">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">
                                                Verify Email
                                            </span>
                                        </Link>}

                                        <Link
                                            to="#analytics"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-200 font-medium"
                                        >
                                            <div className="text-blue-400">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">
                                                Reset Password
                                            </span>
                                        </Link>

                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center space-x-3 px-4 py-2 rounded-xl text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-200 font-medium w-full text-left"
                                        >
                                            <div className="text-blue-400">
                                                <LogOut className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium">
                                                Logout
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile Action Buttons - Only show when not logged in */}
                    {!isLoggedIn && (
                        <div className="flex flex-col space-y-3">
                            <button
                                className="w-full py-3 bg-black/50 border border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                                onClick={() => {
                                    navigate("/login");
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Login
                            </button>
                            <button
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 border border-white/20"
                                onClick={() => {
                                    navigate("/register");
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
