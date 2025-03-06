import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';

let todos: Todo[] = [];
let lastId = 0;

export const createTodo = (req: Request, res: Response) => {
    if (!req.body.title) res.status(400).send("Title cannot be empty");
    if (req.body.title !== undefined && typeof req.body.title !== "string") res.status(400).send("Title must be string");

    const todo: Todo = {
        id: ++lastId,
        title: req.body.title,
        completed: false
    };

    todos.push(todo);
    res.status(201).json(todo);
}

export const getTodos = (req: Request, res: Response) => {
    res.status(200).json(todos);
}

export const getOneTodo = (req: Request, res: Response) => {
    const todo = todos.find((t) => t.id == parseInt(req.params.id));

    if (!todo) res.status(404).send("Item not found");
    else res.status(200).json(todo);
}

export const updateTodo = (req: Request, res: Response) => {
    if (req.body.title !== undefined && typeof req.body.title !== "string") res.status(400).send("Title must be string");
    if (req.body.completed !== undefined && typeof req.body.completed !== "boolean") res.status(400).send("Completed must be boolean");

    const todoIndex = todos.findIndex((t) => t.id == parseInt(req.params.id));

    if (todoIndex < 0) res.status(404).send("Item not found");
    else {
        todos[todoIndex].title = req.body.title || todos[todoIndex].title;
        todos[todoIndex].completed = req.body.completed || todos[todoIndex].completed;
        res.status(200).json({ id: req.params.id, ...req.body });
    }
}

export const deleteTodo = (req: Request, res: Response) => {
    const todoIndex = todos.findIndex((t) => t.id == parseInt(req.params.id));

    if (todoIndex < 0) res.status(404).send("Item not found");
    else {
        todos.splice(todoIndex, 1);
        res.status(200).send("Successfully deleted");
    }
}