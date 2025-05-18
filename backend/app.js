import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/mongo.config.js';
import { redirectFromShortUrl } from './src/controllers/url.controller.js';
import authRouter from './src/routes/auth.route.js';
import urlRouter from './src/routes/url.route.js';
import { errorHandler } from './src/utils/errorHandler.js';

// config
dotenv.config();
const app = express();

// middlewares
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/auth', authRouter);
app.use('/api/', urlRouter);
app.get('/:id', redirectFromShortUrl);

// error handler
app.use(errorHandler);

// server
app.listen(3000, () => {
	connectDB();
	console.log(`🔥 Server is running on port http://localhost:3000`);
});
