import { NotFoundNavigation } from '@/shared/components/ui/molecules/NotFoundNavigation'

export default function NotFoundPage() {
	const magiKarpImageUrl =
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png'

	return (
		<section className="m-auto flex flex-1 flex-col items-center justify-center px-4">
			<div className="mx-auto max-w-md space-y-8 text-center">
				{/* Magikarp Image */}
				<div className="relative">
					<div className="absolute inset-0 animate-pulse rounded-full bg-white/20 blur-3xl" />
					<img
						src={magiKarpImageUrl}
						alt="Magikarp - Page Not Found"
						className="relative z-10 mx-auto h-48 w-48 animate-bounce drop-shadow-2xl"
						style={{ filter: 'drop-shadow(0 25px 50px rgb(0 0 0 / 0.25))' }}
					/>
				</div>

				{/* Error Message */}
				<div className="space-y-4">
					<h1 className="font-bold text-6xl text-white drop-shadow-lg">404</h1>
					<h2 className="font-semibold text-2xl text-white/90">
						Page Not Found
					</h2>
					<p className="text-lg text-white/80 leading-relaxed">
						Oops! It looks like this page has splashed away like Magikarp! The
						page you're looking for doesn't exist.
					</p>
				</div>

				{/* Action Buttons */}
				<NotFoundNavigation />
			</div>

			{/* Floating bubbles animation */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="bubble bubble-1" />
				<div className="bubble bubble-2" />
				<div className="bubble bubble-3" />
				<div className="bubble bubble-4" />
				<div className="bubble bubble-5" />
			</div>
		</section>
	)
}
