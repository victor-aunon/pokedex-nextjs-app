import { getPokemonChainByNameUseCase } from '@/features/pokemons/application/get-pokemon-chain-by-name.usecase'
import {
	PokemonEvolutionChain,
	PokemonSoundPlayer,
	PokemonTypeBadge,
} from '@/features/pokemons/presentation/components'
import {
	PokemonData,
	PokemonStats,
} from '@/features/pokemons/presentation/components'
import type { Locale } from '@/i18n-config'
import TiltedCard from '@/shared/components/TiltedCard'
import { GoBackButton } from '@/shared/components/ui/atoms/GoBackButton'
import { Card } from '@/shared/components/ui/molecules'
import type { Dictionary } from '@/shared/providers/DictionaryProvider'
import { ArrowLeft, Sparkle, Zap } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PokemonPageViewProps {
	name: string
	dict: Dictionary
	lang?: Locale
	fromHomeParams?: string
}

export async function PokemonPageView({
	name,
	dict,
	lang = 'en',
	fromHomeParams,
}: PokemonPageViewProps) {
	const pokemonChain = await getPokemonChainByNameUseCase(name, lang)

	const currentPokemon =
		pokemonChain.find(p => p.name.toLowerCase() === name.toLowerCase()) ||
		pokemonChain[0]

	if (!currentPokemon) {
		notFound()
	}

	const homeUrl = fromHomeParams
		? `/${lang}?${decodeURIComponent(fromHomeParams)}`
		: `/${lang}`

	return (
		<section className="min-h-screen ">
			<div className="container mx-auto max-w-6xl px-4 py-8">
				{/* Header con botón de regreso */}
				<div className="mb-8 flex items-center gap-4">
					<GoBackButton href={homeUrl} goBackText={dict.notFound.goBack}>
						<ArrowLeft className="h-5 w-5" />
						{dict.detail.return}
					</GoBackButton>
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
								containerHeight="380px"
								containerWidth="380px"
								imageHeight="350px"
								imageWidth="350px"
								scaleOnHover={1.05}
								showMobileWarning={false}
								showTooltip={false}
							/>
						</div>

						<div className="flex flex-wrap items-center gap-4">
							{/* Número del Pokémon */}
							<p className="text-heading-lg text-muted-foreground italic">
								#{currentPokemon.id.toString()}
							</p>
							{/* Botón de sonido */}
							<PokemonSoundPlayer
								sound={currentPokemon.sound}
								pokemonName={currentPokemon.name}
								dict={dict.detail.player}
							/>
							{/* Badges especiales */}
							<div className="flex gap-2">
								{currentPokemon.isLegendary && (
									<span className="inline-flex items-center gap-1 rounded-full bg-yellow-900 px-3 py-1 font-bold text-body-md text-yellow-200">
										<Zap className="h-5 w-5" />
										{dict.detail.legendary}
									</span>
								)}
								{currentPokemon.isMythical && (
									<span className="inline-flex items-center gap-1 rounded-full bg-purple-900 px-3 py-1 font-bold text-body-md text-purple-200">
										<Sparkle className="h-5 w-5" />
										{dict.detail.mythical}
									</span>
								)}
							</div>
						</div>
					</div>

					{/* Columna derecha: Información */}
					<section className="space-y-6">
						{/* Nombre y tipos */}
						<div className="flex flex-wrap items-baseline gap-4">
							<h1 className=" flex-1 text-foreground text-heading-xl capitalize">
								{currentPokemon.name}
							</h1>

							<div className="flex flex-wrap gap-2">
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
							dict={dict.detail}
						/>

						{/* Descripción */}
						{currentPokemon.description && (
							<Card>
								<h3 className="mb-2 text-card-foreground text-heading-md">
									{dict.detail.description}
								</h3>
								<p className="text-body-md text-muted-foreground">
									{currentPokemon.description}
								</p>
							</Card>
						)}
					</section>
				</div>

				{/* Estadísticas */}
				<PokemonStats stats={currentPokemon.stats} dict={dict.detail} />

				{pokemonChain.length > 1 && (
					<PokemonEvolutionChain
						currentPokemonName={currentPokemon.name}
						pokemonChain={pokemonChain}
						fromHomeParams={fromHomeParams}
						dict={dict.detail}
						lang={lang}
					/>
				)}
			</div>
		</section>
	)
}
