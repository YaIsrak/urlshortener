import { login as loginUser } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginFormSchema } from '@/lib/validator';
import { useAuthStore } from '@/store/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		try {
			const data = await loginUser(values);
			login(data.user);
			toast.success('Logged in successfully');
			navigate({
				to: '/',
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to login', {
				description: (error as Error).message,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				className='space-y-4'
				onSubmit={form.handleSubmit(onSubmit)}>
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
