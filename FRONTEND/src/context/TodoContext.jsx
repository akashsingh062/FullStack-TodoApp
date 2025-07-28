import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TodoContext = createContext();


export const TodoProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAllTodos = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/api/v1/todos`, {
                withCredentials: true
            });
            const data = response.data.data; 
            setTodos(
                data.map(todo => ({
                    id: todo._id,
                    title: todo.title,
                    description: todo.description || "",
                    completed: todo.completed,
                    dueDate: todo.dueDate || null,
                    createdAt: todo.createdAt,
                    updatedAt: todo.updatedAt
                }))
            );
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch todos");
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }

    const createTodo = async (todo) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/v1/todo`, {
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                completed: todo.completed || false,
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success("Todo created successfully!");
                await getAllTodos(); // Refresh the todos list
                return response.data.data;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create todo");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const editTodo = async (todoId, updatedData) => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`${backendUrl}/api/v1/todos/${todoId}`, updatedData, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success("Todo updated successfully!");
                await getAllTodos(); // Refresh the todos list
                return response.data.data;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update todo");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteTodo = async (todoId) => {
        try {
            setIsLoading(true);
            const response = await axios.delete(`${backendUrl}/api/v1/todos/${todoId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success("Todo deleted successfully!");
                await getAllTodos(); // Refresh the todos list
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete todo");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const toggleTodoCompletion = async (todoId, currentStatus) => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`${backendUrl}/api/v1/todos/${todoId}`, {
                completed: !currentStatus
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success(`Todo marked as ${!currentStatus ? 'completed' : 'pending'}!`);
                await getAllTodos(); // Refresh the todos list
                return response.data.data;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update todo status");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const getTodoById = async (todoId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendUrl}/api/v1/todos/${todoId}`, {
                withCredentials: true
            });

            if (response.data.success) {
                const todo = response.data.data;
                return {
                    id: todo._id,
                    title: todo.title,
                    description: todo.description || "",
                    completed: todo.completed,
                    dueDate: todo.dueDate || null,
                    createdAt: todo.createdAt,
                    updatedAt: todo.updatedAt
                };
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch todo");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const value = {
        todos,
        setTodos,
        currentTodo,
        setCurrentTodo,
        getAllTodos,
        createTodo,
        editTodo,
        deleteTodo,
        toggleTodoCompletion,
        getTodoById,
        isLoading,
        setIsLoading
    }
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};