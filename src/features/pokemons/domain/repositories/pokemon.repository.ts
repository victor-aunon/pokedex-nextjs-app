import type {
	PokemonBase,
	PokemonGenerationDescriptionOddity,
} from '@/features/pokemons/domain/entities/pokemon'
import type { Pagination } from '@/shared/types/pagination.types'

export interface PokemonRepository {
	getPokemons(limit: number, offset?: number): Promise<Pagination<PokemonBase>>
	getPokemonByName(name: string): Promise<PokemonBase>
	getPokemonSpeciesByName(
		name: string,
		language?: 'es' | 'en',
	): Promise<PokemonGenerationDescriptionOddity>
	getPokemonEvolutionChain(id: number): Promise<string[]>
}
