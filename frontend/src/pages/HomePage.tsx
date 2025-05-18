import UrlForm from '@/components/UrlForm';

export default function HomePage() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='px-4'>
				<div className='flex flex-col items-center text-center space-y-2 md:space-y-4 mb-6 md:mb-12'>
					<h1 className='text-3xl md:text-5xl font-bold tracking-tighter'>
						Shorten, share, and track your links
					</h1>
					<p className='text-muted-foreground text-sm md:text-xl max-w-[700px]'>
						Create short links, QR Codes, and Link-in-bio pages. Share
						them anywhere. Track what's working and what's not.
					</p>
				</div>

				<div className='border p-4 md:p-6 rounded-2xl'>
					<UrlForm />
				</div>
				<p className='text-xs text-muted-foreground mt-2 text-center'>
					By using our service, you agree to our Terms of Service and
					Privacy Policy
				</p>
			</div>
		</div>
	);
}
