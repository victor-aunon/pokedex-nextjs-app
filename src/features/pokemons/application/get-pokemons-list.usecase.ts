import { env } from '@/env'
import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import { pokeapiRepository } from '@/features/pokemons/infrastructure/adapters/pokeapi.adapter'
import type { Pagination } from '@/shared/types/pagination.types'

export async function getPokemonsListUseCase(): Promise<
	Pagination<PokemonItem>
> {
	const pokemonRepository: PokemonRepository = pokeapiRepository()

	const pokemonsBaseData = await pokemonRepository.getPokemons(
		env.DEFAULT_PAGINATION_LIMIT,
	)

	const pokemonsPromises = pokemonsBaseData.results.map(pokemon =>
		pokemonRepository.getPokemonSpeciesByName(pokemon.name),
	)
	const pokemonsData = await Promise.all(pokemonsPromises)

	return {
		...pokemonsBaseData,
		results: pokemonsBaseData.results.map((pokemon, index) => ({
			...pokemon,
			evolutionChain: pokemonsData[index]?.evolutionChain || null,
			generation: pokemonsData[index]?.generation || '',
			description: pokemonsData[index]?.description || '',
			isLegendary: pokemonsData[index]?.isLegendary || false,
			isMythical: pokemonsData[index]?.isMythical || false,
		})),
	}
}
