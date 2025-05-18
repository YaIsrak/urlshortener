import type { urlFormSchema } from '@/lib/validator';
import type { z } from 'zod';
import axiosInstance from '../lib/axiosInstance';

export const createShortUrl = async (values: z.infer<typeof urlFormSchema>) => {
	const { data } = await axiosInstance.post('/api/create', values);
	return data;
};

export const getUrlsForUser = async () => {
	const { data } = await axiosInstance.get('/api/urls');
	return data;
};

export const deleteShortUrl = async (id: string) => {
	const { data } = await axiosInstance.delete(`/api/url/${id}`);
	return data;
};
