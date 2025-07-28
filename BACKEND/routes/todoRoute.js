import express from "express"
import {
    getAllTodos,
    createNewTodo,
    editTodo,
    deleteTodo,
    getTodo,
    getRecentTodos,
    getTodoStats,
  } from "../controllers/todoController.js";

const router = express.Router();

router.get('/todos', getAllTodos);
router.get('/todos/recent', getRecentTodos);
router.get('/todos/stats', getTodoStats);
router.post('/todo', createNewTodo);
router.patch('/todos/:id', editTodo);
router.delete('/todos/:id', deleteTodo);
router.get('/todos/:id', getTodo);

export default router