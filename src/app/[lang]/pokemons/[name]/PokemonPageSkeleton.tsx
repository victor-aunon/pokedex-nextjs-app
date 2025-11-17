import { GoBackButton } from '@/shared/components/ui/atoms/GoBackButton'
import { Skeleton } from '@/shared/components/ui/atoms/Skeleton'
import { Card } from '@/shared/components/ui/molecules'
import { ArrowLeft } from 'lucide-react'

export function PokemonPageSkeleton() {
	return (
		<section className="min-h-screen">
			<div className="container mx-auto max-w-6xl px-4 py-8">
				{/* Grid principal */}
				<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Columna izquierda: Imagen skeleton */}
					<div className="flex flex-col items-center space-y-6">
						{/* TiltedCard skeleton */}
						<div className="relative">
							<Skeleton className="h-[380px] w-[380px] rounded-lg" />
						</div>

						{/* Info adicional skeleton */}
						<div className="flex flex-wrap items-center gap-4">
							{/* Número del Pokémon skeleton */}
							<Skeleton className="h-8 w-20" />

							{/* Botón de sonido skeleton */}
							<Skeleton className="h-10 w-32" />

							{/* Badges especiales skeleton */}
							<div className="flex gap-2">
								<Skeleton className="h-8 w-24 rounded-full" />
								<Skeleton className="h-8 w-20 rounded-full" />
							</div>
						</div>
					</div>

					{/* Columna derecha: Información skeleton */}
					<section className="space-y-6">
						{/* Nombre y tipos skeleton */}
						<div className="flex flex-wrap items-baseline gap-4">
							<Skeleton className="h-12 min-w-40 flex-1" />

							<div className="flex flex-wrap gap-2">
								<Skeleton className="h-8 w-16 rounded-full" />
								<Skeleton className="h-8 w-20 rounded-full" />
							</div>
						</div>

						{/* Información básica skeleton */}
						<Card className="p-6">
							<Skeleton className="mb-4 h-6 w-32" />
							<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
								<div className="space-y-2">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-6 w-20" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-6 w-18" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-6 w-12" />
								</div>
								<div className="space-y-2">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-6 w-24" />
								</div>
							</div>
						</Card>

						{/* Descripción skeleton */}
						<Card>
							<Skeleton className="mb-4 h-6 w-28" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
							</div>
						</Card>
					</section>
				</div>

				{/* Estadísticas skeleton */}
				<Card className="mb-6 p-6">
					<Skeleton className="mb-6 h-6 w-24" />
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-5" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-6 w-8" />
							</div>
							<Skeleton className="h-3 w-full rounded-full" />
						</div>
					</div>
				</Card>

				{/* Cadena de evolución skeleton */}
				<Card>
					<Skeleton className="mb-6 h-8 w-40" />
					<div className="flex flex-wrap items-center justify-center gap-4">
						<div className="flex items-center">
							<div className="flex flex-col items-center rounded-lg p-4">
								<Skeleton className="h-40 w-40 rounded-lg" />
								<Skeleton className="mt-2 h-5 w-20" />
								<Skeleton className="mt-1 h-4 w-12" />
							</div>
							<Skeleton className="mx-2 hidden h-6 w-6 sm:block" />
						</div>
						<div className="flex items-center">
							<div className="flex flex-col items-center rounded-lg p-4">
								<Skeleton className="h-40 w-40 rounded-lg" />
								<Skeleton className="mt-2 h-5 w-20" />
								<Skeleton className="mt-1 h-4 w-12" />
							</div>
							<Skeleton className="mx-2 hidden h-6 w-6 sm:block" />
						</div>
						<div className="flex items-center">
							<div className="flex flex-col items-center rounded-lg p-4">
								<Skeleton className="h-40 w-40 rounded-lg" />
								<Skeleton className="mt-2 h-5 w-20" />
								<Skeleton className="mt-1 h-4 w-12" />
							</div>
						</div>
					</div>
				</Card>
			</div>
		</section>
	)
}
