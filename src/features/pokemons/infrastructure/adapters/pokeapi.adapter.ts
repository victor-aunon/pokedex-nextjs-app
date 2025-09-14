import type {
	PokemonBase,
	PokemonGenerationDescriptionOddity,
} from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import type { PokemonEvolutionChainResponse } from '@/features/pokemons/infrastructure/types/pokeapi-evolution-chain.types'
import type { PokemonSpeciesResponse } from '@/features/pokemons/infrastructure/types/pokeapi-pokemon-species.types'
import type { PokemonResponse } from '@/features/pokemons/infrastructure/types/pokeapi-pokemon.types'
import type { PokemonsListResponse } from '@/features/pokemons/infrastructure/types/pokeapi-pokemons-list.types'
import type { Pagination } from '@/shared/types/pagination.types'

export function pokeapiRepository(): PokemonRepository {
	const baseUrl = 'https://pokeapi.co/api/v2'

	function parsePokemonToBase(pokemon: PokemonResponse): PokemonBase {
		const image =
			pokemon.sprites?.other?.['official-artwork']?.front_default ??
			pokemon.sprites?.other?.home?.front_default ??
			pokemon.sprites?.other?.dream_world?.front_default ??
			pokemon.sprites?.front_default

		return {
			id: pokemon.id,
			name: pokemon.name,
			image,
			types: pokemon.types.map(type => type.type.name),
			heightInCm: Math.round(pokemon.height * 10 * 100) / 100,
			weightInKg: Math.round((pokemon.weight / 10) * 100) / 100,
			sound: pokemon.cries?.latest ?? pokemon.cries?.legacy,
			stats: {
				hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat ?? 0,
				attack:
					pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat ??
					0,
				defense:
					pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat ??
					0,
				specialAttack:
					pokemon.stats.find(stat => stat.stat.name === 'special-attack')
						?.base_stat ?? 0,
				specialDefense:
					pokemon.stats.find(stat => stat.stat.name === 'special-defense')
						?.base_stat ?? 0,
				speed:
					pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat ??
					0,
			},
		}
	}

	async function getPokemons(
		limit: number,
		offset = 0,
	): Promise<Pagination<PokemonBase>> {
		let listData: PokemonsListResponse
		const baseResponse = {
			results: [],
			currentPage: 0,
			totalPages: 0,
		}

		try {
			const listResponse = await fetch(
				`${baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
			)
			listData = await listResponse.json()
		} catch (error) {
			console.error(`Error fetching pokemons list: ${error}`)
			return baseResponse
		}

		try {
			const pokemonsPromises = listData.results.map(pokemon =>
				getPokemonByName(pokemon.name),
			)
			const pokemonsData = await Promise.all(pokemonsPromises)
			const currentPage = Math.floor(offset / limit) + 1
			const totalPages = Math.ceil(listData.count / limit)

			return {
				results: pokemonsData,
				currentPage,
				totalPages,
			}
		} catch (error) {
			console.error(`Error fetching pokemon: ${error}`)
			return baseResponse
		}
	}

	async function getPokemonByName(name: string): Promise<PokemonBase> {
		try {
			const response = await fetch(`${baseUrl}/pokemon/${name}`)

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Pokemon not found')
				}
				throw new Error('Error fetching pokemon')
			}

			const pokemon = (await response.json()) as PokemonResponse
			return parsePokemonToBase(pokemon)
		} catch (error) {
			console.error(`Error fetching pokemon ${name}: ${error}`)
			throw new Error(`Error fetching pokemon ${name}: ${error}`)
		}
	}

	function parseEvolutionChain(
		chain: PokemonEvolutionChainResponse['chain'],
	): string[] {
		let evolutionNames: string[] = [chain.species.name]

		if (chain.evolves_to.length > 0) {
			const nextEvolutions = chain.evolves_to.flatMap(nextChain =>
				parseEvolutionChain(nextChain),
			)
			evolutionNames = evolutionNames.concat(nextEvolutions)
		}

		return evolutionNames
	}

	async function getPokemonEvolutionChain(id: number): Promise<string[]> {
		try {
			const response = await fetch(`${baseUrl}/evolution-chain/${id}`)

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Evolution chain not found')
				}
				throw new Error('Error fetching evolution chain')
			}

			const evolutionChain =
				(await response.json()) as PokemonEvolutionChainResponse

			return parseEvolutionChain(evolutionChain.chain)
		} catch (error) {
			console.error(`Error fetching evolution chain ${id}: ${error}`)
			throw new Error(`Error fetching evolution chain ${id}: ${error}`)
		}
	}

	async function getPokemonSpeciesByName(
		name: string,
		language = 'en',
	): Promise<PokemonGenerationDescriptionOddity> {
		try {
			const response = await fetch(`${baseUrl}/pokemon-species/${name}`)

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Pokemon not found')
				}
				throw new Error('Error fetching pokemon species')
			}

			const speciesData = (await response.json()) as PokemonSpeciesResponse

			const description = (
				speciesData.flavor_text_entries.find(
					entry => entry.language.name === language,
				)?.flavor_text || ''
			)
				.replaceAll('\n', ' ')
				.replaceAll('\f', ' ')
				.replaceAll('\r', ' ')
				.replaceAll('\t', ' ')

			const evolutionChain =
				speciesData.evolution_chain.url.split('/').at(-2) || ''

			return {
				evolutionChain: isNaN(Number(evolutionChain))
					? null
					: Number(evolutionChain as string),
				generation: speciesData.generation.name.split('-')[1] || '',
				description,
				isLegendary: speciesData.is_legendary,
				isMythical: speciesData.is_mythical,
			}
		} catch (error) {
			console.error(`Error fetching pokemon species: ${error}`)
			throw new Error(`Error fetching pokemon species: ${error}`)
		}
	}

	return {
		getPokemons,
		getPokemonByName,
		getPokemonEvolutionChain,
		getPokemonSpeciesByName,
	}
}
