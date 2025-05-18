import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuth';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';

export default function CopyToUrl({
	shortUrl,
	setShortUrl,
}: {
	shortUrl: string;
	setShortUrl: React.Dispatch<React.SetStateAction<null>>;
}) {
	const [copied, setCopied] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { isAuthenticated } = useAuthStore();

	const handleCopy = () => {
		if (inputRef.current) {
			navigator.clipboard.writeText(inputRef.current.value);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		}
	};

	return (
		<div className='*:not-first:mt-2 space-y-4'>
			<span className='text-muted-foreground text-sm font-medium ps-2'>
				Original Url: https://google.com
			</span>
			<div className='relative'>
				<Input
					ref={inputRef}
					className='pe-9 bg-muted border-none h-14 px-4 rounded-2xl font-semibold text-xl'
					type='text'
					defaultValue={shortUrl}
					readOnly
				/>
				<TooltipProvider delayDuration={0}>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								onClick={handleCopy}
								className='text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 right-2 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed'
								aria-label={copied ? 'Copied' : 'Copy to clipboard'}
								disabled={copied}>
								<div
									className={cn(
										'transition-all cursor-pointer',
										copied
											? 'scale-100 opacity-100'
											: 'scale-0 opacity-0',
									)}>
									<CheckIcon
										className='stroke-emerald-500 cursor-pointer'
										size={16}
										aria-hidden='true'
									/>
								</div>
								<div
									className={cn(
										'absolute transition-all cursor-pointer',
										copied
											? 'scale-0 opacity-0'
											: 'scale-100 opacity-100',
									)}>
									<CopyIcon
										size={16}
										aria-hidden='true'
									/>
								</div>
							</button>
						</TooltipTrigger>
						<TooltipContent className='px-2 py-1 text-xs'>
							Copy to clipboard
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className='flex items-center space-x-2'>
				<div className='flex-1'>
					<Button
						variant={!isAuthenticated ? 'default' : 'outline'}
						className='w-full'
						onClick={() => setShortUrl(null)}>
						Create a new link
					</Button>
				</div>
				{isAuthenticated && (
					<div className='flex-1'>
						<Button
							className='w-full'
							asChild>
							<Link to='/dashboard'>
								View all my links
								<ArrowRightIcon className='w-4 h-4' />
							</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
