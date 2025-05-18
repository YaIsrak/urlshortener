import { Router } from 'express';
import {
	createShortUrl,
	deleteUrlById,
	getUrls,
} from '../controllers/url.controller.js';
import {
	authMiddleware,
	optionalMiddleware,
} from '../middlewares/auth.middleware.js';

const urlRouter = Router();

urlRouter.post('/create', optionalMiddleware, createShortUrl);
urlRouter.get('/urls', authMiddleware, getUrls);
urlRouter.delete('/url/:id', authMiddleware, deleteUrlById);

export default urlRouter;
