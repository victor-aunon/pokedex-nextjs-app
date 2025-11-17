import type {
	Pokemon,
	PokemonBase,
	PokemonGenerationDescriptionOddity,
} from '@/features/pokemons/domain/entities/pokemon'
import type { Locale } from '@/i18n-config'
import type { Pagination } from '@/shared/types/pagination.types'
import type { PokemonGenerations } from '../enums/generations.enum'
import type { PokemonTypes } from '../enums/types.enum'

export interface PokemonRepository {
	getPokemons(
		itemsPerPage: number,
		page?: number,
		lang?: Locale,
	): Promise<Pagination<Pokemon>>
	getAllFilteredPokemons(
		type?: PokemonTypes,
		generation?: PokemonGenerations,
		itemsPerPage?: number,
		lang?: Locale,
	): Promise<Pagination<Pokemon>>
	getPokemonByName(name: string): Promise<PokemonBase>
	getPokemonSpecies(
		specie: string,
		language?: Locale,
	): Promise<PokemonGenerationDescriptionOddity>
	getPokemonEvolutionChain(id: number): Promise<string[]>
}
