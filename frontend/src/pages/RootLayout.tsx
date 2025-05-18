import Navbar from '@/components/Navbar';
import { Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export default function RootLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster richColors />
		</>
	);
}
