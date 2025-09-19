import { env } from '@/env'
import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { Suspense } from 'react'
import { HomePageView } from './HomePageView'

export default async function HomePage() {
	const pokemonsToFetch =
		env.NODE_ENV === 'development'
			? env.AMOUNT_OF_POKEMONS_TO_FETCH_IN_DEV
			: 3000

	const pokemons = await getPokemonsListUseCase({
		itemsPerPage: pokemonsToFetch,
	})

	return (
		<Suspense>
			<HomePageView
				pokemons={pokemons.results}
				itemsPerPage={env.DEFAULT_PAGINATION_LIMIT}
			/>
		</Suspense>
	)
}
