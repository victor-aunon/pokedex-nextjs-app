import type {
	PokemonBase,
	PokemonItem,
} from '@/features/pokemons/domain/entities/pokemon'
import { describe, expect, it } from 'vitest'

describe('Pokemon Domain Entities', () => {
	describe('PokemonBase', () => {
		it('should have all required properties', () => {
			const pokemon: PokemonBase = {
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
			}

			expect(pokemon.id).toBe(1)
			expect(pokemon.name).toBe('bulbasaur')
			expect(pokemon.types).toContain('grass')
			expect(pokemon.types).toContain('poison')
			expect(pokemon.stats.hp).toBe(45)
			expect(pokemon.stats.attack).toBe(49)
		})

		it('should allow null values for optional properties', () => {
			const pokemon: PokemonBase = {
				id: 1,
				name: 'missingno',
				image: null,
				types: ['normal'],
				sound: null,
				heightInCm: 0,
				weightInKg: 0,
				species: 'Glitch Pokémon',
				stats: {
					hp: 0,
					attack: 0,
					defense: 0,
					specialAttack: 0,
					specialDefense: 0,
					speed: 0,
				},
			}

			expect(pokemon.image).toBeNull()
			expect(pokemon.sound).toBeNull()
		})
	})

	describe('PokemonItem', () => {
		it('should extend PokemonBase with generation and description data', () => {
			const pokemonItem: PokemonItem = {
				id: 150,
				name: 'mewtwo',
				image: 'https://example.com/mewtwo.png',
				types: ['psychic'],
				sound: 'https://example.com/mewtwo.wav',
				heightInCm: 200,
				weightInKg: 122,
				species: 'Genetic Pokémon',
				stats: {
					hp: 106,
					attack: 110,
					defense: 90,
					specialAttack: 154,
					specialDefense: 90,
					speed: 130,
				},
				evolutionChain: null,
				generation: 'generation-i',
				description:
					'It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.',
				isLegendary: true,
				isMythical: false,
			}

			expect(pokemonItem.isLegendary).toBe(true)
			expect(pokemonItem.isMythical).toBe(false)
			expect(pokemonItem.generation).toBe('generation-i')
			expect(pokemonItem.description).toContain('scientist')
		})

		it('should handle mythical Pokémon correctly', () => {
			const pokemonItem: PokemonItem = {
				id: 151,
				name: 'mew',
				image: 'https://example.com/mew.png',
				types: ['psychic'],
				sound: 'https://example.com/mew.wav',
				heightInCm: 40,
				weightInKg: 4,
				species: 'New Species Pokémon',
				stats: {
					hp: 100,
					attack: 100,
					defense: 100,
					specialAttack: 100,
					specialDefense: 100,
					speed: 100,
				},
				evolutionChain: null,
				generation: 'generation-i',
				description:
					'So rare that it is still said to be a mirage by many experts.',
				isLegendary: false,
				isMythical: true,
			}

			expect(pokemonItem.isLegendary).toBe(false)
			expect(pokemonItem.isMythical).toBe(true)
		})
	})
})
