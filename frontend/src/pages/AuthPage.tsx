import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useState } from 'react';

export default function AuthPage() {
	const [login, setLogin] = useState(false);

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='w-[400px] shadow-none border p-6 rounded-2xl'>
				<div className='pb-4'>
					{/* todo: add logo */}
					<img
						src='/logo.png'
						alt='logo'
						width={50}
						height={50}
						className='pb-4'
					/>
					<h1 className='text-lg md:text-xl font-bold'>
						{login ? 'Login' : 'Register'}
					</h1>
					<p className='text-xs md:text-sm text-muted-foreground'>
						{login ? 'Sign in to your account' : 'Create a new account'}
					</p>
				</div>

				{login ? <LoginForm /> : <RegisterForm />}
				{/* <RegisterForm /> */}
				{/* <LoginForm /> */}

				<div className='flex flex-col items-center justify-center mt-4'>
					<p className='text-xs md:text-sm text-muted-foreground text-center'>
						Don&apos;t have an account?{' '}
						<span
							onClick={() => setLogin(!login)}
							className='text-primary hover:underline cursor-pointer'>
							{login ? 'Register' : 'Login'}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
