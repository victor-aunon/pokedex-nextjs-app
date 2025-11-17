import type { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import type { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'

export interface GetPokemonsListInput {
	itemsPerPage?: number
	page?: number
	generation?: PokemonGenerations
	type?: PokemonTypes
}
