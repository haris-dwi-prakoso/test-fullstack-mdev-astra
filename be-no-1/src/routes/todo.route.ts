import { Router } from "express";
import * as todoController from "../controllers/todo.controller"

const todoRoutes = Router();

todoRoutes.post('/', todoController.createTodo);
todoRoutes.get('/', todoController.getTodos);
todoRoutes.get('/:id', todoController.getOneTodo);
todoRoutes.patch('/:id', todoController.updateTodo);
todoRoutes.delete('/:id', todoController.deleteTodo);

export default todoRoutes;