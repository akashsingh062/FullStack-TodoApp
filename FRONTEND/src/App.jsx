import React from "react";
import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/authPages/HomePage.jsx";
import LoginPage from "./pages/authPages/LoginPage.jsx";
import RegisterPage from "./pages/authPages/RegisterPage.jsx";
import VerifyEmailPage from "./pages/authPages/VerifyEmailPage.jsx";
import ResetPasswordPage from "./pages/authPages/ResetPasswordPage.jsx";
import Navbar from "./components/Navbar.jsx";
import DashboardPage from "./pages/todoPages/DashboardPage.jsx";
import CreateTodo from "./pages/todoPages/CreateTodo.jsx";
import EditTodo from "./pages/todoPages/EditTodo.jsx";
import TodoList from "./pages/todoPages/TodoList.jsx";


const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/todos/create" element={<CreateTodo />} />
                <Route path="/todos/edit/:id" element={<EditTodo />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white'
                }}
            />
        </>
    );
};

export default App;
