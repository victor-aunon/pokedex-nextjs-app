import { GET } from '@/app/api/pokemons/route'
import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'

// Mock the use case
vi.mock('@/features/pokemons/application/get-pokemons-list.usecase', () => ({
	getPokemonsListUseCase: vi.fn(),
}))

import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'

describe('/api/pokemons API Route', () => {
	it('should return paginated Pokémon list', async () => {
		// Arrange
		const mockPagination = {
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

		vi.mocked(getPokemonsListUseCase).mockResolvedValue(mockPagination)

		const request = new NextRequest('http://localhost:3000/api/pokemons')

		// Act
		const response = await GET(request)
		const data = await response.json()

		// Assert
		expect(response.status).toBe(200)
		expect(data).toEqual(mockPagination)
		expect(getPokemonsListUseCase).toHaveBeenCalledWith({})
	})

	it('should handle query parameters correctly', async () => {
		// Arrange
		const mockPagination = {
			results: [],
			currentPage: 1,
			totalPages: 0,
		}

		vi.mocked(getPokemonsListUseCase).mockResolvedValue(mockPagination)

		const request = new NextRequest(
			'http://localhost:3000/api/pokemons?page=2&itemsPerPage=10&type=fire',
		)

		// Act
		const response = await GET(request)

		// Assert
		expect(response.status).toBe(200)
		expect(getPokemonsListUseCase).toHaveBeenCalledWith({
			page: 2,
			itemsPerPage: 10,
			type: 'fire',
		})
	})

	it('should handle use case errors', async () => {
		// Arrange
		const error = new Error('Database connection failed')
		vi.mocked(getPokemonsListUseCase).mockRejectedValue(error)

		const request = new NextRequest('http://localhost:3000/api/pokemons')

		// Act
		const response = await GET(request)
		const data = await response.json()

		// Assert
		expect(response.status).toBe(500)
		expect(data).toEqual({
			error: 'Error processing pokemons',
			details: 'Database connection failed',
		})
	})

	it('should handle invalid query parameters gracefully', async () => {
		// Clear any previous mock calls
		vi.mocked(getPokemonsListUseCase).mockClear()

		const request = new NextRequest(
			'http://localhost:3000/api/pokemons?page=invalid&itemsPerPage=abc',
		)

		// Act
		const response = await GET(request)
		const data = await response.json()

		// Assert
		expect(response.status).toBe(500)
		expect(data).toEqual({
			error: 'Error processing pokemons',
			details: 'Invalid query parameters',
			errors: expect.any(Object),
		})
		expect(getPokemonsListUseCase).not.toHaveBeenCalled()
	})
})
