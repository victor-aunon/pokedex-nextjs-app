import type {
	PokemonBase,
	PokemonGenerationDescriptionOddity,
	PokemonItem,
} from '@/features/pokemons/domain/entities/pokemon'
import type { Pagination } from '@/shared/types/pagination.types'
import type { PokemonGenerations } from '../enums/generations.enum'
import type { PokemonTypes } from '../enums/types.enum'

export interface PokemonRepository {
	getPokemons(
		itemsPerPage: number,
		page?: number,
	): Promise<Pagination<PokemonItem>>
	getFilteredPokemons(
		type?: PokemonTypes,
		generation?: PokemonGenerations,
		itemsPerPage?: number,
	): Promise<Pagination<PokemonItem>>
	getPokemonByName(name: string): Promise<PokemonBase>
	getPokemonSpecies(
		specie: string,
		language?: 'es' | 'en',
	): Promise<PokemonGenerationDescriptionOddity>
	getPokemonEvolutionChain(id: number): Promise<string[]>
}
