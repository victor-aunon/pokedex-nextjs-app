import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { usePagination } from '@/features/pokemons/presentation/hooks/usePagination'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockSearchParams = new URLSearchParams()

vi.mock('next/navigation', () => ({
	useRouter: () => ({}),
	useSearchParams: () => mockSearchParams,
}))

const mockReplaceState = vi.fn()

Object.defineProperty(window, 'history', {
	value: {
		replaceState: mockReplaceState,
	},
	writable: true,
})

// Mock Pokemon data
const mockPokemons: Pokemon[] = [
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
	{
		id: 4,
		name: 'charmander',
		image: 'https://example.com/charmander.png',
		types: ['fire'],
		sound: 'https://example.com/charmander.wav',
		heightInCm: 60,
		weightInKg: 8.5,
		species: 'Lizard Pokémon',
		stats: {
			hp: 39,
			attack: 52,
			defense: 43,
			specialAttack: 60,
			specialDefense: 50,
			speed: 65,
		},
		evolutionChain: null,
		generation: 'generation-i',
		description: 'Obviously prefers hot places.',
		isLegendary: false,
		isMythical: false,
		evolutions: [],
	},
]

describe('usePagination Hook', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockReplaceState.mockClear()
	})

	it('should initialize with default values', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 20,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		expect(result.current.currentPage).toBe(1)
		expect(result.current.queryState).toBeNull()
		expect(result.current.filtersState.type).toBe(PokemonTypes.Bug)
		expect(result.current.filtersState.generation).toBeNull()
	})

	it('should filter Pokémon by query', async () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 20,
				items: mockPokemons,
				query: 'char',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		act(() => {
			result.current.handleQueryChange('char')
		})

		expect(result.current.queryState).toBe('char')

		await vi.waitFor(
			() => {
				expect(mockReplaceState).toHaveBeenCalledWith({}, '', '/?query=char')
			},
			{ timeout: 500 },
		)
	})

	it('should filter Pokémon by type', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 20,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		act(() => {
			result.current.handleFiltersChange({ type: PokemonTypes.Fire })
		})

		expect(result.current.filtersState.type).toBe(PokemonTypes.Fire)
		expect(mockReplaceState).toHaveBeenCalledWith({}, '', '/?type=fire')
	})

	it('should reset page when filters change', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 3,
				itemsPerPage: 1,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		expect(result.current.currentPage).toBe(3)

		act(() => {
			result.current.handleFiltersChange({ type: PokemonTypes.Fire })
		})

		expect(result.current.currentPage).toBe(1)
	})

	it('should handle page changes', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 1,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		act(() => {
			result.current.handlePageChange(2)
		})

		expect(result.current.currentPage).toBe(2)
	})

	it('should calculate total pages correctly', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 1,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Grass, // bulbasaur has grass type
				generation: '',
			}),
		)

		expect(result.current.totalPages).toBe(1) // 1 grass type pokemon with 1 per page
	})

	it('should return paginated results', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 1,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Grass, // bulbasaur has grass type
				generation: '',
			}),
		)

		expect(result.current.paginatedFilteredPokemons).toHaveLength(1)
		expect(result.current.paginatedFilteredPokemons[0]?.name).toBe('bulbasaur')
	})

	it('should clear query from URL when empty string is provided', async () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 20,
				items: mockPokemons,
				query: 'test',
				type: PokemonTypes.Bug,
				generation: '',
			}),
		)

		act(() => {
			result.current.handleQueryChange('')
		})

		await vi.waitFor(
			() => {
				expect(mockReplaceState).toHaveBeenCalledWith({}, '', '/?')
			},
			{ timeout: 500 },
		)
	})

	it('should preserve existing filters when updating one filter', () => {
		const { result } = renderHook(() =>
			usePagination({
				page: 1,
				itemsPerPage: 20,
				items: mockPokemons,
				query: '',
				type: PokemonTypes.Fire,
				generation: 'generation-i',
			}),
		)

		act(() => {
			result.current.handleFiltersChange({ generation: 'generation-ii' })
		})

		expect(result.current.filtersState.type).toBe(PokemonTypes.Fire)
		expect(result.current.filtersState.generation).toBe('generation-ii')
	})
})
