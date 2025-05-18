import jsonwebtoken from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export const generateNanoId = (length) => {
	return nanoid(length);
};

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, {
		// fix: token expiration
		expiresIn: '1h',
	});

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		// fix: token expiration
		maxAge: 1000 * 60 * 60, // 1 hour
	});

	return token;
};
