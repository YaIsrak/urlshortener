import axiosInstance from '@/lib/axiosInstance';
import type { loginFormSchema, registerFormSchema } from '@/lib/validator';
import type { z } from 'zod';

export const login = async (values: z.infer<typeof loginFormSchema>) => {
	const { data } = await axiosInstance.post('/api/auth/login', values);
	return data;
};

export const register = async (values: z.infer<typeof registerFormSchema>) => {
	const { data } = await axiosInstance.post('/api/auth/register', values);
	return data;
};

export const logout = async () => {
	const { data } = await axiosInstance.post('/api/auth/logout');
	return data;
};

export const getMe = async () => {
	const { data } = await axiosInstance.get('/api/auth/me');
	return data;
};
