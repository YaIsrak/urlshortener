import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/useAuth';
import { Link } from '@tanstack/react-router';
import { LinkIcon, UserIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar() {
	const { isAuthenticated, user, logout } = useAuthStore();

	return (
		<nav className='bg-white border border-b-black fixed w-full z-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					{/* Left side - App Name */}
					<div className='flex items-center'>
						<Link
							to='/'
							className='gap-2 text-xl font-bold text-gray-800 flex items-center'>
							<LinkIcon className='size-5' />
							Unify
						</Link>
					</div>

					{/* Right side - Auth buttons */}
					<div className='flex items-center'>
						{isAuthenticated ? (
							<DropdownMenu>
								{/* main trigger */}
								<DropdownMenuTrigger className=''>
									<div className='rounded-full overflow-hidden size-8 flex items-center justify-center border'>
										<UserIcon className='size-4 text-gray-800' />
									</div>
								</DropdownMenuTrigger>

								{/* content */}
								<DropdownMenuContent>
									<DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link to='/dashboard'>Dashboard</Link>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={logout}>
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Button>
								<Link to='/auth'>Login</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
