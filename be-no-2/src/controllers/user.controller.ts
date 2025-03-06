import { Request, Response } from 'express';
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

let users: User[] = [];
let lastId = 0;

export const register = async (req: Request, res: Response) => {
    if (!req.body.username) res.status(400).send("Username cannot be empty");
    if (req.body.username !== undefined && typeof req.body.username !== "string") res.status(400).send("Username must be string");
    if (!req.body.password) res.status(400).send("Password cannot be empty");
    if (req.body.password !== undefined && typeof req.body.password !== "string") res.status(400).send("Title must be string");
    let matchUser = users.find((u) => u.username == req.body.username);
    if (matchUser) res.status(400).send("Username already exists");

    let hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
    let newUser: User = {
        id: ++lastId,
        username: req.body.username,
        password: hashedPassword
    };
    users.push(newUser);

    res.status(201).json(newUser);
}

export const login = (req: Request, res: Response) => {
    if (!req.body.username) res.status(400).send("Username cannot be empty");
    if (req.body.username !== undefined && typeof req.body.username !== "string") res.status(400).send("Username must be string");
    if (!req.body.password) res.status(400).send("Password cannot be empty");
    if (req.body.password !== undefined && typeof req.body.password !== "string") res.status(400).send("Title must be string");

    let matchUser = users.find((u) => u.username == req.body.username);
    if (!matchUser) res.status(404).send("User not found");
    else {
        let matchPassword = bcrypt.compareSync(req.body.password, matchUser.password);
        if (!matchPassword) res.status(400).send("Password mismatch");
        else {
            let token = jwt.sign({ id: matchUser.id, username: matchUser.username }, process.env.SECRET_KEY!);

            res.status(200).json({ token: token });
        }
    }
}

export const profile = async (req: Request, res: Response) => {
    let user = users.find((u) => u.id == Number(req.headers['id']));
    if (!user) res.status(404).send("User not found");
    else {
        let returnData = {
            id: user.id,
            username: user.username
        }

        res.status(200).json(returnData);
    }
}