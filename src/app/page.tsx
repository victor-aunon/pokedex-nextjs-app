import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { HomePageView } from './HomePageView'

export default async function HomePage() {
	const pokemons = await getPokemonsListUseCase({ itemsPerPage: 10 })

	return <HomePageView pokemons={pokemons.results} />
}
