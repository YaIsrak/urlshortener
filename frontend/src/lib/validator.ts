import { z } from 'zod';

export const urlFormSchema = z.object({
	url: z.string().url(),
	slug: z.string().optional(),
});

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const registerFormSchema = z.object({
	name: z.string().min(3).max(30),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});
