import { Loader, Plus, SearchIcon } from 'lucide-react';

import { getUrlsForUser } from '@/api/shortUrl.api';
import States from '@/components/States';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UrlList from '@/components/UrlList';
import { useAuthStore } from '@/store/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link, redirect } from '@tanstack/react-router';

export interface UrlType {
	clicks: number;
	createdAt: Date;
	full_url: string;
	short_url: string;
	updatedAt: Date;
	user: string;
	_id: string;
}

export default function DashboardPage() {
	const { isAuthenticated } = useAuthStore();
	if (!isAuthenticated) redirect({ to: '/' });

	const { data, isLoading } = useQuery({
		queryKey: ['urls'],
		queryFn: getUrlsForUser,
	});

	const urls = data as UrlType[];

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-28'>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
					<div>
						<h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
							Dashboard
						</h1>
						<p className='text-muted-foreground'>
							Manage and track all your shortened links
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<div className='relative w-full md:w-64'>
							<Input
								placeholder='Search links...'
								className='pl-8'
							/>
							<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						</div>
						<Button asChild>
							<Link to='/'>
								<Plus className='mr-2 h-4 w-4' /> New Link
							</Link>
						</Button>
					</div>
				</div>

				{isLoading && (
					<div className='flex justify-center py-12'>
						<Loader className='h-4 w-4 animate-spin' />
					</div>
				)}

				{!isLoading && (
					<>
						<States urls={urls} />
						<UrlList urls={urls} />
					</>
				)}
			</div>
		</div>
	);
}
