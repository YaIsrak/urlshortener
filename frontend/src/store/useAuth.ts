import type { loginFormSchema } from '@/lib/validator';
import type { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	isAuthenticated: boolean;
	user: any | null;

	login: (userData: z.infer<typeof loginFormSchema>) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,

			login: (userData) =>
				set({
					isAuthenticated: true,
					user: userData,
				}),

			logout: () =>
				set({
					isAuthenticated: false,
					user: null,
				}),
		}),
		{
			name: 'auth-storage',

			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				user: state.user,
			}),
		},
	),
);
