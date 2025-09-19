import { getPokemonTypeColor } from '@/shared/lib/pokemon-utils'
import { describe, expect, it } from 'vitest'

describe('Pokemon Utils', () => {
	describe('getPokemonTypeColor', () => {
		it('should return correct color for valid types', () => {
			expect(getPokemonTypeColor('fire')).toBe('var(--color-pokemon-fire)')
			expect(getPokemonTypeColor('water')).toBe('var(--color-pokemon-water)')
			expect(getPokemonTypeColor('grass')).toBe('var(--color-pokemon-grass)')
			expect(getPokemonTypeColor('electric')).toBe(
				'var(--color-pokemon-electric)',
			)
		})

		it('should be case insensitive', () => {
			expect(getPokemonTypeColor('FIRE')).toBe('var(--color-pokemon-fire)')
			expect(getPokemonTypeColor('Fire')).toBe('var(--color-pokemon-fire)')
			expect(getPokemonTypeColor('fIrE')).toBe('var(--color-pokemon-fire)')
		})

		it('should return normal color for invalid types', () => {
			expect(getPokemonTypeColor('invalid')).toBe('var(--color-pokemon-normal)')
			expect(getPokemonTypeColor('')).toBe('var(--color-pokemon-normal)')
			expect(getPokemonTypeColor('nonexistent')).toBe(
				'var(--color-pokemon-normal)',
			)
		})

		it('should handle all Pokemon types', () => {
			const validTypes = [
				'normal',
				'fighting',
				'flying',
				'poison',
				'ground',
				'rock',
				'bug',
				'ghost',
				'steel',
				'fire',
				'water',
				'grass',
				'electric',
				'psychic',
				'ice',
				'dragon',
				'dark',
				'fairy',
			]

			validTypes.forEach(type => {
				const result = getPokemonTypeColor(type)
				expect(result).toBe(`var(--color-pokemon-${type})`)
				expect(result).toMatch(/^var\(--color-pokemon-\w+\)$/)
			})
		})
	})
})
