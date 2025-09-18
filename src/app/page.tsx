import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { PokemonCard } from '@/features/pokemons/presentation/components'
import { CardGrid } from '@/shared/components/ui/atoms/CardGrid'
import { use } from 'react'

export default function HomePage() {
	// const pokemons = await getPokemonsListUseCase({ type: PokemonTypes.Fairy })
	// console.log(pokemons)
	const pokemons = use(getPokemonsListUseCase({ itemsPerPage: 10 }))

	return (
		<CardGrid>
			{pokemons.results.map(pokemon => (
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
					className="scale-70 w-xl:scale-100 lg:scale-75"
				/>
			))}
		</CardGrid>
	)
}
