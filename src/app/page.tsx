import { env } from '@/env'
import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { HomePageView } from './HomePageView'

export default async function HomePage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams
	const { page, query, type, generation } = searchParams

	const pokemonsToFetch =
		env.NODE_ENV === 'development'
			? env.AMOUNT_OF_POKEMONS_TO_FETCH_IN_DEV
			: 3000

	const pokemons = await getPokemonsListUseCase({
		itemsPerPage: pokemonsToFetch,
	})

	return (
		<HomePageView
			pokemons={pokemons.results}
			page={page ? Number(page) : 1}
			query={query as string}
			type={type as PokemonTypes}
			generation={generation as PokemonGenerations}
			itemsPerPage={env.DEFAULT_PAGINATION_LIMIT}
		/>
	)
}
