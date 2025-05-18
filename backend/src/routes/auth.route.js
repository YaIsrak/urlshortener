import { Router } from 'express';
import {
	getMe,
	login,
	logout,
	register,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/me', authMiddleware, getMe);

export default authRouter;
