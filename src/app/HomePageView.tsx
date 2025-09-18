import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import { PokemonCard } from '@/features/pokemons/presentation/components'
import { CardGrid } from '@/shared/components/ui/atoms/CardGrid'

interface HomePageViewProps {
	pokemons: PokemonItem[]
}

export function HomePageView({ pokemons }: HomePageViewProps) {
	return (
		<CardGrid>
			{pokemons.map(pokemon => (
				<PokemonCard
					key={pokemon.id}
					id={pokemon.id}
					types={pokemon.types}
					generation={pokemon.generation}
					avatarUrl={pokemon.image || ''}
					mobileTiltSensitivity={1}
					name={pokemon.name}
					grainUrl="https://reactbits.dev/assets/grain.webp"
					showBehindGradient={false}
					className="scale-65 w-xl:scale-100 lg:scale-75"
				/>
			))}
		</CardGrid>
	)
}
