import { createShortUrl } from '@/api/shortUrl.api';
import { urlFormSchema } from '@/lib/validator';
import { useAuthStore } from '@/store/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, LinkIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import CopyToUrl from './CopyToUrl';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';

export default function UrlForm() {
	const [shortUrl, setShortUrl] = useState(null);
	const [showCustom, setShowCustom] = useState(false);
	const { isAuthenticated } = useAuthStore();

	const form = useForm<z.infer<typeof urlFormSchema>>({
		resolver: zodResolver(urlFormSchema),
		defaultValues: {
			url: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof urlFormSchema>) => {
		try {
			const data = await createShortUrl(values);
			setShortUrl(data.short_url);

			toast.success('Short URL created successfully', {
				description: `URL: ${data.short_url}`,
			});

			form.reset();
		} catch (err) {
			console.warn(err);
			toast.error('Failed to create short url', {
				description: (err as Error).message,
			});
		}
	};

	return (
		<>
			{!shortUrl ? (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'>
						<FormField
							control={form.control}
							name='url'
							render={({ field }) => (
								<FormItem className='relative'>
									<FormControl>
										<Input
											placeholder='Paste your link here '
											className='h-12 px-4'
											{...field}
										/>
									</FormControl>
									<LinkIcon className='size-4 absolute top-1/2 right-4 -translate-y-1/2 opacity-50' />
									<FormMessage />
								</FormItem>
							)}
						/>

						{isAuthenticated && (
							<>
								<div className='flex items-center space-x-2'>
									<Checkbox
										id='custom'
										className='border-black'
										checked={showCustom}
										onCheckedChange={() => setShowCustom(!showCustom)}
									/>
									<label
										htmlFor='custom'
										className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
										Custom URL?
									</label>
								</div>
								{showCustom && (
									<FormField
										control={form.control}
										name='slug'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder='Custom slug'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</>
						)}

						<Button
							type='submit'
							disabled={form.formState.isSubmitting}
							className='w-full'>
							{form.formState.isSubmitting ? (
								<span className='mr-2'>Creating...</span>
							) : (
								<>
									<span>Shorten</span>
									<ArrowRight />
								</>
							)}
						</Button>
					</form>
				</Form>
			) : (
				<CopyToUrl
					shortUrl={shortUrl}
					setShortUrl={setShortUrl}
				/>
			)}
		</>
	);
}
