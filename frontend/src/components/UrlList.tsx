import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import UrlItem from '@/components/UrlItem';
import type { UrlType } from '@/pages/DashboardPage';

export default function UrlList({ urls }: { urls: UrlType[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Links</CardTitle>
				<CardDescription>
					Manage and track all your shortened URLs.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Short URL</TableHead>
							<TableHead className='hidden md:table-cell'>
								Original URL
							</TableHead>
							<TableHead>Clicks</TableHead>
							<TableHead className='hidden md:table-cell'>
								Created
							</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					{urls.length > 0 ? (
						<TableBody>
							{urls.map((url) => (
								<UrlItem
									key={url._id}
									url={url}
								/>
							))}
						</TableBody>
					) : (
						<TableBody>
							<TableRow>
								<TableCell
									colSpan={5}
									className='h-24 text-center'>
									No urls found.
								</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</CardContent>
		</Card>
	);
}
