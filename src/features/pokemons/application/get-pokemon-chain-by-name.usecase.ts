import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import { pokeapiRepository } from '@/features/pokemons/infrastructure/adapters/pokeapi/pokeapi.adapter'

export async function getPokemonChainByNameUseCase(
	name: string,
): Promise<PokemonItem[]> {
	const pokemonRepository: PokemonRepository = pokeapiRepository()

	const pokemonBase = await pokemonRepository.getPokemonByName(name)
	const pokemonExtraData = await pokemonRepository.getPokemonSpecies(
		pokemonBase.name,
	)
	let evolutionChain: string[] = []
	if (pokemonExtraData.evolutionChain) {
		evolutionChain = await pokemonRepository.getPokemonEvolutionChain(
			pokemonExtraData.evolutionChain,
		)
	}
	const pokemons: PokemonItem[] = []

	for (const pokemonName of evolutionChain) {
		try {
			// Avoid fetching the same pokemon twice
			if (pokemonName === pokemonBase.name) {
				pokemons.push({ ...pokemonBase, ...pokemonExtraData })
				continue
			}
			const evolution = await pokemonRepository.getPokemonByName(pokemonName)
			const evolutionExtraData =
				await pokemonRepository.getPokemonSpecies(pokemonName)
			pokemons.push({ ...evolution, ...evolutionExtraData })
		} catch (error) {
			console.error(`Error fetching evolved pokemon ${pokemonName}: ${error}`)
		}
	}

	return pokemons
}
