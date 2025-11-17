import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import { pokeapiRepository } from '@/features/pokemons/infrastructure/adapters/pokeapi/pokeapi.adapter'

export async function getPokemonByNameUseCase(
	name: string,
): Promise<PokemonItem> {
	const pokemonRepository: PokemonRepository = pokeapiRepository()

	const pokemonBase = await pokemonRepository.getPokemonByName(name)

	const pokemonExtraData = await pokemonRepository.getPokemonSpecies(
		pokemonBase.species,
	)

	return {
		...pokemonBase,
		...pokemonExtraData,
		evolutionChain: pokemonExtraData.evolutionChain || null,
	}
}
