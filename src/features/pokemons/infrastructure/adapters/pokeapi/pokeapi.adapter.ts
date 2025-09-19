import type {
	Pokemon,
	PokemonBase,
	PokemonGenerationDescriptionOddity,
	PokemonItem,
} from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import type { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import { chunk } from '@/shared/lib/utils'
import type { Pagination } from '@/shared/types/pagination.types'
import {
	evolutionChainToDomain,
	pokemonResponseToDomain,
	setEvolutionsToPokemons,
} from './pokeapi.mapper'
import type { PokemonEvolutionChainResponseDTO } from './types/pokeapi-evolution-chain.types'
import type { PokemonSpeciesResponseDTO } from './types/pokeapi-pokemon-species.types'
import type { PokemonResponseDTO } from './types/pokeapi-pokemon.types'
import type { PokemonsListResponseDTO } from './types/pokeapi-pokemons-list.types'

export function pokeapiRepository(): PokemonRepository {
	const baseUrl = 'https://pokeapi.co/api/v2'

	async function getPokemons(
		itemsPerPage: number,
		page = 1,
	): Promise<Pagination<Pokemon>> {
		let listData: PokemonsListResponseDTO
		const baseResponse = {
			results: [],
			currentPage: 0,
			totalPages: 0,
		}
		const offset = itemsPerPage * (page - 1)
		let listAllData: PokemonsListResponseDTO

		try {
			const listAllResponse = await fetch(
				`${baseUrl}/pokemon?limit=5000&offset=0`,
				{ next: { revalidate: 3600 * 24 * 30 } },
			)
			listAllData = await listAllResponse.json()

			const listResponse = await fetch(
				`${baseUrl}/pokemon?limit=${itemsPerPage}&offset=${offset}`,
				{ next: { revalidate: 3600 * 24 * 30 } },
			)
			listData = await listResponse.json()
		} catch (error) {
			console.error(`Error fetching pokemons list: ${error}`)
			return baseResponse
		}

		try {
			const pokemonsBasePromises = listData.results.map(pokemon =>
				getPokemonByName(pokemon.name),
			)
			const pokemonsBase = await Promise.all(pokemonsBasePromises)

			const pokemonsSpeciesPromises = pokemonsBase.map(pokemon =>
				getPokemonSpecies(pokemon.species),
			)
			const pokemonsSpecies = await Promise.all(pokemonsSpeciesPromises)

			const pokemonsItem: PokemonItem[] = pokemonsBase.map(
				(pokemon, index) => ({
					...pokemon,
					evolutionChain: pokemonsSpecies[index]?.evolutionChain || null,
					generation: pokemonsSpecies[index]?.generation || '',
					description: pokemonsSpecies[index]?.description || '',
					isLegendary: pokemonsSpecies[index]?.isLegendary || false,
					isMythical: pokemonsSpecies[index]?.isMythical || false,
				}),
			)

			const pokemons: Pokemon[] = setEvolutionsToPokemons(pokemonsItem)

			const currentPage = Math.floor(offset / itemsPerPage) + 1
			const totalPages = Math.ceil(listAllData.results.length / itemsPerPage)

			return {
				results: pokemons,
				currentPage,
				totalPages,
			}
		} catch (error) {
			console.error(`Error fetching pokemon: ${error}`)
			return baseResponse
		}
	}

	async function getAllFilteredPokemons(
		type?: PokemonTypes,
		generation?: PokemonGenerations,
		itemsPerPage = 1500,
	): Promise<Pagination<Pokemon>> {
		let listData: PokemonsListResponseDTO
		const baseResponse = {
			results: [],
			currentPage: 0,
			totalPages: 0,
		}

		try {
			const listResponse = await fetch(
				`${baseUrl}/pokemon?limit=${itemsPerPage}&offset=0`,
				{ next: { revalidate: 3600 * 24 * 30 } },
			)
			listData = await listResponse.json()
		} catch (error) {
			console.error(`Error fetching pokemons list: ${error}`)
			return baseResponse
		}

		let pokemons: Pokemon[] = []
		const pokemonsBaseChunks = chunk(listData.results, 100)

		// Divide the fetching in chunks, since there are so many requests
		for (const chunk of pokemonsBaseChunks) {
			let pokemonsBase: PokemonBase[]

			try {
				const pokemonsBasePromises = chunk.map(({ name }) =>
					getPokemonByName(name),
				)
				const pokemonsBaseAll = await Promise.all(pokemonsBasePromises)
				pokemonsBase = pokemonsBaseAll.filter(pokemonBase => {
					if (type) return pokemonBase.types?.includes(type)
					return true
				})
			} catch (error) {
				console.error(`Error fetching pokemons base data: ${error}`)
				continue
			}

			try {
				const pokemonsSpeciesPromises = pokemonsBase.map(({ species }) =>
					getPokemonSpecies(species),
				)

				const pokemonsSpecies = await Promise.all(pokemonsSpeciesPromises)

				pokemons = setEvolutionsToPokemons([
					...pokemons,
					...pokemonsBase
						.map((pokemonBase, index) => ({
							...pokemonBase,
							evolutionChain: pokemonsSpecies[index]?.evolutionChain || null,
							generation: pokemonsSpecies[index]?.generation || '',
							description: pokemonsSpecies[index]?.description || '',
							isLegendary: pokemonsSpecies[index]?.isLegendary || false,
							isMythical: pokemonsSpecies[index]?.isMythical || false,
						}))
						.filter(pokemon => {
							if (generation)
								return pokemon.generation === generation.split('-')[1]
							return true
						}),
				])
			} catch (error) {
				console.error(`Error fetching pokemons species: ${error}`)
			}
		}
		return {
			results: pokemons,
			currentPage: 1,
			totalPages: 1,
		}
	}

	async function getPokemonByName(name: string): Promise<PokemonBase> {
		try {
			const response = await fetch(`${baseUrl}/pokemon/${name}`, {
				next: { revalidate: 3600 * 24 * 30 },
			})

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Pokemon not found')
				}
				throw new Error('Error fetching pokemon')
			}

			const pokemon = (await response.json()) as PokemonResponseDTO

			return pokemonResponseToDomain(pokemon)
		} catch (error) {
			console.error(`Error fetching pokemon ${name}: ${error}`)
			throw new Error(`Error fetching pokemon ${name}: ${error}`)
		}
	}

	async function getPokemonEvolutionChain(id: number): Promise<string[]> {
		try {
			const response = await fetch(`${baseUrl}/evolution-chain/${id}`, {
				next: { revalidate: 3600 * 24 * 30 },
			})

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Evolution chain not found')
				}
				throw new Error('Error fetching evolution chain')
			}

			const evolutionChain =
				(await response.json()) as PokemonEvolutionChainResponseDTO

			return evolutionChainToDomain(evolutionChain.chain)
		} catch (error) {
			console.error(`Error fetching evolution chain ${id}: ${error}`)
			throw new Error(`Error fetching evolution chain ${id}: ${error}`)
		}
	}

	async function getPokemonSpecies(
		name: string,
		language = 'en',
	): Promise<PokemonGenerationDescriptionOddity> {
		try {
			const response = await fetch(`${baseUrl}/pokemon-species/${name}`, {
				next: { revalidate: 3600 * 24 * 30 },
			})

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Pokemon not found')
				}
				throw new Error('Error fetching pokemon species')
			}

			const speciesData = (await response.json()) as PokemonSpeciesResponseDTO

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
		getAllFilteredPokemons,
		getPokemonByName,
		getPokemonEvolutionChain,
		getPokemonSpecies,
	}
}
