import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import {
	PokemonEvolutionChain,
	PokemonTypeBadge,
} from '@/features/pokemons/presentation/components'
import {
	PokemonData,
	PokemonStats,
} from '@/features/pokemons/presentation/components'
import TiltedCard from '@/shared/components/TiltedCard'
import { Button } from '@/shared/components/ui/atoms/Button'
import Card from '@/shared/components/ui/molecules/Card'
import { ArrowLeft, Sparkle, Zap } from 'lucide-react'
import Link from 'next/link'

interface PokemonPageViewProps {
	currentPokemon: PokemonItem
	pokemonChain: PokemonItem[]
}

export function PokemonPageView({
	currentPokemon,
	pokemonChain,
}: PokemonPageViewProps) {
	return (
		<section className="min-h-screen ">
			<div className="container mx-auto max-w-6xl px-4 py-8">
				{/* Header con botón de regreso */}
				<div className="mb-8 flex items-center gap-4">
					<Link href="/">
						<Button variant="outline" size="lg" className="w-fit">
							<ArrowLeft className="h-5 w-5" />
							Go to Pokedex
						</Button>
					</Link>
				</div>

				{/* Grid principal */}
				<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Columna izquierda: Imagen */}
					<div className="flex flex-col items-center space-y-6">
						<div className="relative">
							<TiltedCard
								imageSrc={currentPokemon.image || ''}
								altText={`${currentPokemon.name} artwork`}
								captionText={currentPokemon.name}
								containerHeight="400px"
								containerWidth="400px"
								imageHeight="350px"
								imageWidth="350px"
								scaleOnHover={1.05}
								showMobileWarning={false}
								showTooltip={false}
							/>
						</div>

						{/* Número del Pokémon */}
						<div className="flex items-center gap-4">
							<p className="text-heading-lg text-muted-foreground italic">
								#{currentPokemon.id.toString().padStart(3, '0')}
							</p>
							{/* Badges especiales */}
							<div className="flex gap-2">
								{currentPokemon.isLegendary && (
									<span className="inline-flex items-center gap-1 rounded-full bg-yellow-900 px-3 py-1 font-bold text-body-md text-yellow-200">
										<Zap className="h-5 w-5" />
										Legendary
									</span>
								)}
								{currentPokemon.isMythical && (
									<span className="inline-flex items-center gap-1 rounded-full bg-purple-900 px-3 py-1 font-bold text-body-md text-purple-200">
										<Sparkle className="h-5 w-5" />
										Mythical
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Columna derecha: Información */}
					<div className="space-y-6">
						{/* Nombre y tipos */}
						<div>
							<h1 className="mb-4 text-foreground text-heading-xl capitalize ">
								{currentPokemon.name}
							</h1>

							<div className="mb-4 flex flex-wrap gap-2">
								{currentPokemon.types.map(type => (
									<PokemonTypeBadge key={type} type={type} />
								))}
							</div>
						</div>

						{/* Información básica */}
						<PokemonData
							height={currentPokemon.heightInCm}
							weight={currentPokemon.weightInKg}
							generation={currentPokemon.generation}
							species={currentPokemon.species}
						/>

						{/* Descripción */}
						{currentPokemon.description && (
							<Card>
								<h3 className="mb-2 text-card-foreground text-heading-md">
									Description
								</h3>
								<p className="text-body-md text-muted-foreground">
									{currentPokemon.description}
								</p>
							</Card>
						)}
					</div>
				</div>

				{/* Estadísticas */}
				<PokemonStats stats={currentPokemon.stats} />

				{/* Cadena de evolución */}
				{pokemonChain.length > 1 && (
					<PokemonEvolutionChain
						currentPokemonName={currentPokemon.name}
						pokemonChain={pokemonChain}
					/>
				)}
			</div>
		</section>
	)
}
