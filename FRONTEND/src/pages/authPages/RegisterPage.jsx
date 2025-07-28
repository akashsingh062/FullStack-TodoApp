import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useUserContext } from '../../context/UserContext'; 

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useUserContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData.name, formData.email, formData.password);
    };

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
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="text-gray-300">
                            Join thousands of users who trust TodoMaster
                        </p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="relative">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                    placeholder="Create a strong password"
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
                            <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;