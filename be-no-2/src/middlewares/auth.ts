import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const dotenv = (require("dotenv").config()).parsed;

export const SECRET_KEY: Secret = dotenv.SECRET_KEY;

interface CustomPayload extends JwtPayload {
    id: number;
    username: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY) as CustomPayload;
        req.headers['id'] = decoded['id'].toString();

        next();
    } catch (err) {
        res.status(401).send('Authorization token needed');
    }
};