import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import type { PokemonRepository } from '@/features/pokemons/domain/repositories/pokemon.repository'
import type { Pagination } from '@/shared/types/pagination.types'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the repository dependency
vi.mock(
	'@/features/pokemons/infrastructure/adapters/pokeapi/pokeapi.adapter',
	() => ({
		pokeapiRepository: () => mockPokemonRepository,
	}),
)

// Mock repository
const mockPokemonRepository: PokemonRepository = {
	getPokemons: vi.fn(),
	getAllFilteredPokemons: vi.fn(),
	getPokemonByName: vi.fn(),
	getPokemonSpecies: vi.fn(),
	getPokemonEvolutionChain: vi.fn(),
}

// Mock data
const mockPokemonsPagination: Pagination<Pokemon> = {
	results: [
		{
			id: 1,
			name: 'bulbasaur',
			image: 'https://example.com/bulbasaur.png',
			types: ['grass', 'poison'],
			sound: 'https://example.com/bulbasaur.wav',
			heightInCm: 70,
			weightInKg: 6.9,
			species: 'Seed Pokémon',
			stats: {
				hp: 45,
				attack: 49,
				defense: 49,
				specialAttack: 65,
				specialDefense: 65,
				speed: 45,
			},
			evolutionChain: null,
			generation: 'generation-i',
			description: 'A strange seed was planted on its back at birth.',
			isLegendary: false,
			isMythical: false,
			evolutions: [],
		},
	],
	currentPage: 1,
	totalPages: 1,
}

describe('Get Pokémons List Use Case', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should return paginated Pokémon list for basic pagination', async () => {
		// Arrange
		const input = {
			itemsPerPage: 20,
			page: 1,
		}

		vi.mocked(mockPokemonRepository.getPokemons).mockResolvedValue(
			mockPokemonsPagination,
		)

		// Act
		const result = await getPokemonsListUseCase(input)

		// Assert
		expect(result).toEqual(mockPokemonsPagination)
		expect(mockPokemonRepository.getPokemons).toHaveBeenCalledWith(20, 1)
		expect(mockPokemonRepository.getPokemons).toHaveBeenCalledTimes(1)
	})

	it('should use filtered method when type or generation is provided', async () => {
		// Arrange
		const input = {
			itemsPerPage: 20,
			page: 1,
			type: PokemonTypes.Fire,
			generation: PokemonGenerations.Generation1,
		}

		vi.mocked(mockPokemonRepository.getAllFilteredPokemons).mockResolvedValue(
			mockPokemonsPagination,
		)

		// Act
		const result = await getPokemonsListUseCase(input)

		// Assert
		expect(result).toEqual(mockPokemonsPagination)
		expect(mockPokemonRepository.getAllFilteredPokemons).toHaveBeenCalledWith(
			PokemonTypes.Fire,
			PokemonGenerations.Generation1,
		)
		expect(mockPokemonRepository.getAllFilteredPokemons).toHaveBeenCalledTimes(
			1,
		)
	})

	it('should handle repository errors gracefully', async () => {
		// Arrange
		const input = {
			itemsPerPage: 20,
			page: 1,
		}

		const error = new Error('Repository error')
		vi.mocked(mockPokemonRepository.getPokemons).mockRejectedValue(error)

		// Act & Assert
		await expect(getPokemonsListUseCase(input)).rejects.toThrow(
			'Repository error',
		)
	})

	it('should use default values when no input provided', async () => {
		// Arrange
		vi.mocked(mockPokemonRepository.getPokemons).mockResolvedValue(
			mockPokemonsPagination,
		)

		// Act
		await getPokemonsListUseCase()

		// Assert
		expect(mockPokemonRepository.getPokemons).toHaveBeenCalledTimes(1)
	})

	it('should return empty results when no Pokémon match criteria', async () => {
		// Arrange
		const input = {
			type: PokemonTypes.Bug, // Use a real enum value instead of nonexistent
		}

		const emptyPagination: Pagination<Pokemon> = {
			results: [],
			currentPage: 1,
			totalPages: 0,
		}

		vi.mocked(mockPokemonRepository.getAllFilteredPokemons).mockResolvedValue(
			emptyPagination,
		)

		// Act
		const result = await getPokemonsListUseCase(input)

		// Assert
		expect(result.results).toEqual([])
		expect(result.totalPages).toBe(0)
		expect(Array.isArray(result.results)).toBe(true)
	})
})
