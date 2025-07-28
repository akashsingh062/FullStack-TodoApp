import React, { useState, useEffect } from "react";
import {
    CheckCircle,
    Calendar,
    Zap,
    Shield,
    ArrowRight,
    Target,
    Plus,
    User,
    Mail,
    TrendingUp,
    Clock,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContext";
import { useTodoContext } from "../../context/TodoContext";

const HomePage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const { isLoggedIn, user, isEmailVerified } = useUserContext();
    const { todos } = useTodoContext();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <CheckCircle className="w-8 h-8" />,
            title: "Smart Task Management",
            description:
                "Create, organize, and complete tasks with our intuitive interface designed for maximum productivity.",
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Never Miss Deadlines",
            description:
                "Set due dates, get reminders, and track your progress to ensure you stay on top of everything.",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Boost Productivity",
            description:
                "Streamlined workflows and smart categorization help you focus on what matters most.",
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure & Reliable",
            description:
                "Your data is protected with enterprise-grade security and reliable cloud synchronization.",
        },
    ];

    const stats = [
        { number: "10,000+", label: "Active Users" },
        { number: "1M+", label: "Tasks Completed" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" },
    ];

    // Calculate user stats for logged-in users
    const userStats = {
        totalTodos: todos?.length || 0,
        completedTodos: todos?.filter(todo => todo.completed).length || 0,
        pendingTodos: todos?.filter(todo => !todo.completed).length || 0,
        todayTodos: todos?.filter(todo => {
            const today = new Date().toISOString().split('T')[0];
            return todo.dueDate === today;
        }).length || 0
    };

    // Get recent todos for logged-in users
    const recentTodos = todos?.slice(0, 3) || [];

    // Render content for logged-in users
    const renderLoggedInContent = () => (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Welcome Section */}
            <section className="relative px-6 py-20 md:py-32">
                <div className="max-w-7xl mx-auto">
                    <div
                        className={`transition-all duration-1000 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <div className="text-center mb-12">
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                                Welcome back,
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    {user?.name || 'User'}! 👋
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Ready to tackle your tasks? Here's your productivity overview.
                            </p>
                        </div>

                        {/* User Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">Total Todos</p>
                                        <p className="text-3xl font-bold text-white">{userStats.totalTodos}</p>
                                    </div>
                                    <div className="bg-blue-500/20 p-3 rounded-lg">
                                        <Target className="w-6 h-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">Completed</p>
                                        <p className="text-3xl font-bold text-white">{userStats.completedTodos}</p>
                                    </div>
                                    <div className="bg-green-500/20 p-3 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-green-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">Pending</p>
                                        <p className="text-3xl font-bold text-white">{userStats.pendingTodos}</p>
                                    </div>
                                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                                        <Clock className="w-6 h-6 text-yellow-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">Due Today</p>
                                        <p className="text-3xl font-bold text-white">{userStats.todayTodos}</p>
                                    </div>
                                    <div className="bg-purple-500/20 p-3 rounded-lg">
                                        <Calendar className="w-6 h-6 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                            >
                                <span>Go to Dashboard</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate("/todos/create")}
                                className="group px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-2"
                            >
                                <Plus className="w-5 h-5" />
                                <span>Create New Todo</span>
                            </button>
                            <button
                                onClick={() => navigate("/todos")}
                                className="group px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-2"
                            >
                                <Target className="w-5 h-5" />
                                <span>View All Todos</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Todos Section */}
            {recentTodos.length > 0 && (
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Recent Todos
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentTodos.map((todo, index) => (
                                <div
                                    key={todo.id || index}
                                    className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            todo.completed
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-400'
                                        }`}>
                                            {todo.completed && <CheckCircle className="w-4 h-4 text-white" />}
                                        </div>
                                        <span className={`text-sm px-2 py-1 rounded-full ${
                                            todo.completed
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {todo.completed ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">
                                        {todo.title}
                                    </h3>
                                    {todo.description && (
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {todo.description}
                                        </p>
                                    )}
                                    {todo.dueDate && (
                                        <div className="flex items-center text-gray-400 text-sm">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* User Profile Section */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-blue-500/20 p-4 rounded-full mr-4">
                                <User className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-white">{user?.name}</h3>
                                <div className="flex items-center mt-2">
                                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-300">{user?.email}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                    <Shield className={`w-4 h-4 mr-2 ${
                                        isEmailVerified ? 'text-green-400' : 'text-red-400'
                                    }`} />
                                    <span className={`text-sm ${
                                        isEmailVerified ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {isEmailVerified ? 'Email Verified' : 'Email Not Verified'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {!isEmailVerified && (
                            <div className="mb-6">
                                <p className="text-yellow-300 mb-4">
                                    Please verify your email to access all features.
                                </p>
                                <button
                                    onClick={() => navigate("/verify-email")}
                                    className="px-6 py-3 bg-yellow-500 text-black rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300"
                                >
                                    Verify Email
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{userStats.totalTodos}</div>
                                <div className="text-gray-400">Total Tasks</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-400">{userStats.completedTodos}</div>
                                <div className="text-gray-400">Completed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-400">
                                    {userStats.totalTodos > 0 ? Math.round((userStats.completedTodos / userStats.totalTodos) * 100) : 0}%
                                </div>
                                <div className="text-gray-400">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            TodoMaster
                        </span>
                    </div>
                    <p className="text-gray-400">
                        © 2025 TodoMaster. Crafted with ❤️ for productivity enthusiasts.
                    </p>
                </div>
            </footer>
        </div>
    );

    // Render content for non-logged-in users (original marketing page)
    const renderGuestContent = () => (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-6 py-20 md:py-32">
                <div className="max-w-7xl mx-auto text-center">
                    <div
                        className={`transition-all duration-1000 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
                            Master Your
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Productivity
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Transform chaos into clarity. Organize your tasks,
                            boost your productivity, and never miss a deadline
                            with TodoMaster's intelligent task management
                            system.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                            <button
                                onClick={() => navigate("/register")}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                            >
                                <span>Get Started Free</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-400 text-sm md:text-base">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Why Choose TodoMaster?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Discover the features that make TodoMaster the perfect
                            companion for your productivity journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who have already transformed
                            their productivity with TodoMaster.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate("/register")}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Create Account
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white rounded-xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            TodoMaster
                        </span>
                    </div>
                    <p className="text-gray-400">
                        © 2025 TodoMaster. Crafted with ❤️ for productivity
                        enthusiasts.
                    </p>
                </div>
            </footer>
        </div>
    );

    // Return the appropriate content based on authentication status
    return isLoggedIn ? renderLoggedInContent() : renderGuestContent();
};

export default HomePage;
