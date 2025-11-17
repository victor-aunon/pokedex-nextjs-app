import { env } from '@/env'
import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import { pokeapiRepository } from '@/features/pokemons/infrastructure/adapters/pokeapi/pokeapi.adapter'
import type { Pagination } from '@/shared/types/pagination.types'
import type { GetPokemonsListInput } from './get-pokemons-list.input'

export async function getPokemonsListUseCase(
	input: GetPokemonsListInput = {},
): Promise<Pagination<Pokemon>> {
	const pokemonRepository: PokemonRepository = pokeapiRepository()
	const {
		itemsPerPage = env.DEFAULT_PAGINATION_LIMIT,
		page,
		generation,
		type,
	} = input

	if (generation || type)
		return await pokemonRepository.getAllFilteredPokemons(type, generation)

	return await pokemonRepository.getPokemons(itemsPerPage, page)
}
