import Todo from "../models/todoModel.js"
import { tryCatchWrapper } from "../errorHandler/tryCatchWraper.js";
import { decodeIdFromToken } from "../utils/generateTokens.js"

export const getAllTodos = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    const todos = await Todo.find({ user: id }).sort({ createdAt: -1 });
    return res.status(200).json({
        success: true,
        data: todos,
    });
})

export const getRecentTodos = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    const limit = parseInt(req.query.limit) || 5 // Default to 5 recent todos

    const recentTodos = await Todo.find({ user: id })
        .sort({ createdAt: -1 }) // Sort by newest first
        .limit(limit)
        .select('title description completed dueDate createdAt updatedAt'); // Include dueDate in selected fields

    return res.status(200).json({
        success: true,
        data: recentTodos,
    });
})

export const getTodoStats = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    
    // Get total todos count
    const totalTodos = await Todo.countDocuments({ user: id });
    
    // Get completed todos count
    const completedTodos = await Todo.countDocuments({ user: id, completed: true });
    
    // Get pending todos count
    const pendingTodos = await Todo.countDocuments({ user: id, completed: false });
    
    // Calculate completion percentage
    const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
    
    return res.status(200).json({
        success: true,
        data: {
            totalTodos,
            completedTodos,
            pendingTodos,
            completionPercentage
        },
    });
})

export const createNewTodo = tryCatchWrapper(async (req, res) => {
    const { title, description = '', dueDate, completed = false } = req.body
    if (!title || title.trim().length === 0) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }
    if (title.trim().length > 200) {
        return res.status(400).json({
            success: false,
            message: "Title cannot exceed 200 characters"
        });
    }
    if (description.trim().length > 1000) {
        return res.status(400).json({
            success: false,
            message: "Description cannot exceed 1000 characters"
        });
    }

    // Validate dueDate if provided
    let parsedDueDate = null;
    if (dueDate) {
        parsedDueDate = new Date(dueDate);
        if (isNaN(parsedDueDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid due date format"
            });
        }
    }

    const token = req.cookies.token
    const id = decodeIdFromToken(token)
    const newTodo = new Todo({
        title,
        description,
        user: id,
        dueDate: parsedDueDate,
        completed: completed
    })
    await newTodo.save()
    res.status(201).json({
        success: true,
        data: newTodo
    })
})

export const editTodo = tryCatchWrapper(async (req, res) => {
    const { id } = req.params
    const { title, description = '', completed = false, dueDate } = req.body;
    const updateData = {};

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: "Title must be a non-empty string"
            });
        }
        if (title.trim().length > 200) {
            return res.status(400).json({
                success: false,
                message: "Title cannot exceed 200 characters"
            });
        }
        updateData.title = title.trim();
    }

    if (description !== undefined) {
        if (typeof description !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Description must be a string"
            });
        }
        if (description.trim().length > 1000) {
            return res.status(400).json({
                success: false,
                message: "Description cannot exceed 1000 characters"
            });
        }
        updateData.description = description.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: "Completed must be a boolean value"
            });
        }
        updateData.completed = completed;
    }

    if (dueDate !== undefined) {
        if (dueDate === null || dueDate === '') {
            updateData.dueDate = null;
        } else {
            const parsedDueDate = new Date(dueDate);
            if (isNaN(parsedDueDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid due date format"
                });
            }
            updateData.dueDate = parsedDueDate;
        }
    }

    const token = req.cookies.token
    const userId = decodeIdFromToken(token)
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true });
    res.status(200).json({
        success: true,
        message: "Todo Updated Successfully",
        data: updatedTodo
    })
})

export const deleteTodo = tryCatchWrapper(async (req, res) => {
    const token = req.cookies.token
    const userId = decodeIdFromToken(token)
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!deletedTodo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Todo deleted successfully"
    });
});

export const getTodo = tryCatchWrapper(async (req, res) => {
    const { id } = req.params
    const token = req.cookies.token
    const userId = decodeIdFromToken(token)
    const todo = await Todo.findOne({ _id: id, user: userId })
    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found"
        });
    }
    res.status(200).json({
        success: true,
        data: todo
    });
})