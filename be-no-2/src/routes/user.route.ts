import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/profile', auth, userController.profile)

export default userRoutes;