import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UrlType } from '@/pages/DashboardPage';

export default function States({ urls }: { urls: UrlType[] }) {
	const totalLinks = urls.length;
	const totalClicks = urls.reduce((acc, url) => acc + url.clicks, 0);
	const avgClicks = totalLinks > 0 ? totalClicks / totalLinks : 0;

	return (
		<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total Links
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-3xl font-bold'>{totalLinks}</div>
					<p className='text-xs text-muted-foreground'>
						+{totalLinks / 2} from last week
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium'>
						Total Clicks
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-3xl font-bold'>{totalClicks}</div>
					<p className='text-xs text-muted-foreground'>
						+{totalClicks / 2}% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className='pb-2'>
					<CardTitle className='text-sm font-medium'>
						Avg. Clicks per Link
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='text-3xl font-bold'>{avgClicks.toFixed(2)}</div>
					<p className='text-xs text-muted-foreground'>
						+{avgClicks / 2}% from last month
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
