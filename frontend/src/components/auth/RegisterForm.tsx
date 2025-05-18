'use client';

import { register } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerFormSchema } from '@/lib/validator';
import { useAuthStore } from '@/store/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuthStore();

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
		try {
			if (values.password !== values.confirmPassword) {
				toast.error('Passwords do not match');
				return;
			}

			const data = await register(values);
			login(data.user);
			toast.success('Registered successfully');
			navigate({
				to: '/dashboard',
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to register', {
				description: (error as Error).message,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				className='space-y-4'
				onSubmit={form.handleSubmit(onSubmit)}>
				{/* Username */}
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='email@mail.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<div className='relative'>
								<FormControl>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder={
											showPassword ? 'password' : '********'
										}
										{...field}
									/>
								</FormControl>
								<div className='text-muted-foreground hover:cursor-pointer hover:text-primary absolute right-2 top-1/2 translate-y-[-50%]'>
									{showPassword ? (
										<EyeOffIcon
											className='size-4'
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										/>
									) : (
										<EyeIcon
											className='size-4'
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										/>
									)}
								</div>
							</div>
							<FormDescription className='text-xs'>
								Minimum 8 characters
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Confirm Password */}
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<div className='relative'>
								<FormControl>
									<Input
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder={
											showConfirmPassword ? 'password' : '********'
										}
										{...field}
									/>
								</FormControl>
								<div className='text-muted-foreground hover:cursor-pointer hover:text-primary absolute right-2 top-1/2 translate-y-[-50%]'>
									{showConfirmPassword ? (
										<EyeOffIcon
											className='size-4'
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
										/>
									) : (
										<EyeIcon
											className='size-4'
											onClick={() => {
												setShowConfirmPassword((prev) => !prev);
											}}
										/>
									)}
								</div>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<Loader2 className='animate-spin' />
					) : (
						'Sign Up'
					)}
				</Button>
			</form>
		</Form>
	);
}
