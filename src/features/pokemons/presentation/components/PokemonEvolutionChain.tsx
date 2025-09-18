import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import Card from '@/shared/components/ui/molecules/Card'
import { Triangle } from 'lucide-react'
import Link from 'next/link'

interface PokemonEvolutionChainProps {
	currentPokemonName: PokemonItem['name']
	pokemonChain: PokemonItem[]
}

export default function PokemonEvolutionChain({
	currentPokemonName,
	pokemonChain,
}: PokemonEvolutionChainProps) {
	return (
		<Card>
			<h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">
				Evolution Chain
			</h2>

			<div className="flex flex-wrap items-center justify-center gap-4">
				{pokemonChain.map((pokemon, index) => (
					<div key={pokemon.id} className="flex items-center">
						<Link
							href={`/pokemons/${pokemon.name}`}
							className="group relative flex flex-col items-center rounded-lg p-4 transition-colors "
						>
							{/* Inner glow */}
							{pokemon.name.toLowerCase() ===
								currentPokemonName.toLowerCase() && (
								<div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-lg shadow-[0_-15px_50px_50px_var(--color-primary)]" />
							)}
							<img
								src={pokemon.image || ''}
								alt={`${pokemon.name} sprite`}
								className="z-10 h-40 w-40 object-contain transition-transform group-hover:scale-110 "
							/>

							<span className="z-10 mt-2 text-heading-sm text-secondary-foreground capitalize">
								{pokemon.name}
							</span>

							<span className="z-10 text-muted-foreground text-sm italic">
								#{pokemon.id.toString()}
							</span>
							{/* Cursor icon */}
							{pokemon.name.toLowerCase() ===
								currentPokemonName.toLowerCase() && (
								<div className="absolute top-[-0.5rem] left-5/12 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
									<Triangle className="h-4 w-4 rotate-180 text-primary-foreground" />
								</div>
							)}
						</Link>

						{index < pokemonChain.length - 1 && (
							<div className="mx-2 hidden text-heading-lg text-muted-foreground/40 sm:block">
								→
							</div>
						)}
					</div>
				))}
			</div>
		</Card>
	)
}
