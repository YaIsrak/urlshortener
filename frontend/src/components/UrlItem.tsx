import {
	CheckIcon,
	Copy,
	ExternalLink,
	MoreHorizontal,
	Trash2,
} from 'lucide-react';

import { deleteShortUrl } from '@/api/shortUrl.api';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { serverUrl } from '@/lib/axiosInstance';
import type { UrlType } from '@/pages/DashboardPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UrlItem({ url }: { url: UrlType }) {
	const shortUrl = `${serverUrl}/${url.short_url}`;
	const [copied, setCopied] = useState(false);
	const queryClient = useQueryClient();

	const handleCopy = () => {
		navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	const mutation = useMutation({
		mutationFn: () => deleteShortUrl(url._id),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['urls'] });
			toast('Deleted successfully');
		},
	});

	return (
		<TableRow>
			<TableCell>
				<div className='font-medium flex items-center'>
					<span className='text-primary'>{shortUrl}</span>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 ml-2'
						onClick={handleCopy}>
						{copied ? (
							<CheckIcon className='size-4 text-green-500' />
						) : (
							<Copy className='size-4' />
						)}
						<span className='sr-only'>{copied ? 'Copied' : 'Copy'}</span>
					</Button>
				</div>
			</TableCell>
			<TableCell className='hidden md:table-cell'>
				<div className='max-w-[300px] truncate text-muted-foreground'>
					{url.full_url}
				</div>
			</TableCell>
			<TableCell>
				<div className='font-medium'>{url.clicks}</div>
			</TableCell>
			<TableCell className='hidden md:table-cell'>
				<div className='text-muted-foreground'>
					{new Date(url.createdAt).toDateString()}
				</div>
			</TableCell>
			<TableCell className='text-right'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8'>
							<MoreHorizontal className='h-4 w-4' />

							<span className='sr-only'>Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem asChild>
							<a
								href={shortUrl}
								target='_blank'>
								<ExternalLink className='mr-2 h-4 w-4' /> Open
							</a>
						</DropdownMenuItem>
						<DropdownMenuItem
							className='text-destructive'
							onClick={() => mutation.mutate()}>
							<Trash2 className='mr-2 h-4 w-4' /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
}
