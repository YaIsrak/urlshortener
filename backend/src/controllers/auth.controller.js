import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/helper.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

export const register = wrapAsync(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name) throw new Error('Name is required');
	if (!email) throw new Error('Email is required');
	if (!password) throw new Error('Password is required');

	const existingUser = await User.findOne({ email });
	if (existingUser) throw new Error('User already exists');

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({ name, email, password: hashedPassword });
	await user.save();

	const token = generateTokenAndSetCookie(res, user._id.toString());
	req.user = user;

	res.status(200).json({
		message: 'register success',
		token,
		user: {
			...user.toObject(),
			password: undefined,
		},
	});
});

export const login = wrapAsync(async (req, res) => {
	const { email, password } = req.body;

	if (!email) throw new Error('Email is required');
	if (!password) throw new Error('Password is required');

	const user = await User.findOne({ email });
	if (!user) throw new Error('User not found');

	const isPasswordValid = user && bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) throw new Error('Invalid password');

	generateTokenAndSetCookie(res, user._id.toString());
	req.user = user;

	res.status(200).json({
		message: 'Signed in successfully',
		user: {
			...user.toObject(),
			password: undefined,
		},
	});
});

export const logout = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Signed out successfully',
	});
};

export const getMe = (req, res) => {
	res.status(200).json(req.user);
};
