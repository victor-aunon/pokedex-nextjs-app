import PokemonTypeBadge from '@/features/pokemons/presentation/components/PokemonTypeBadge'
import { getPokemonTypeColor } from '@/shared/lib/pokemon-utils'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock pokemon-utils
vi.mock('@/shared/lib/pokemon-utils', () => ({
	getPokemonTypeColor: vi.fn((type: string) => {
		const colors: Record<string, string> = {
			fire: 'var(--color-pokemon-fire)',
			water: 'var(--color-pokemon-water)',
			grass: 'var(--color-pokemon-grass)',
			electric: 'var(--color-pokemon-electric)',
			psychic: 'var(--color-pokemon-psychic)',
			ice: 'var(--color-pokemon-ice)',
			dragon: 'var(--color-pokemon-dragon)',
			dark: 'var(--color-pokemon-dark)',
			fairy: 'var(--color-pokemon-fairy)',
			normal: 'var(--color-pokemon-normal)',
			fighting: 'var(--color-pokemon-fighting)',
			poison: 'var(--color-pokemon-poison)',
			ground: 'var(--color-pokemon-ground)',
			flying: 'var(--color-pokemon-flying)',
			bug: 'var(--color-pokemon-bug)',
			rock: 'var(--color-pokemon-rock)',
			ghost: 'var(--color-pokemon-ghost)',
			steel: 'var(--color-pokemon-steel)',
		}
		return colors[type.toLowerCase()] || 'var(--color-pokemon-normal)'
	}),
}))

describe('PokemonTypeBadge', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should render type badge with correct text', () => {
		render(<PokemonTypeBadge type="fire" />)

		expect(screen.getByText('fire')).toBeInTheDocument()
	})

	it('should render type icon with correct attributes', () => {
		render(<PokemonTypeBadge type="water" />)

		const icon = screen.getByAltText('water')
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveAttribute('src', '/img/types/water.svg')
	})

	it('should apply correct background color for different types', () => {
		const { rerender, container } = render(<PokemonTypeBadge type="fire" />)

		const fireSpan = container.querySelector('span[style]')
		const fireStyle = fireSpan?.getAttribute('style')
		expect(fireStyle).toContain('background-color')

		rerender(<PokemonTypeBadge type="water" />)
		const waterSpan = container.querySelector('span[style]')
		const waterStyle = waterSpan?.getAttribute('style')
		expect(waterStyle).toContain('background-color')
	})

	it('should capitalize type text', () => {
		render(<PokemonTypeBadge type="electric" />)

		const typeText = screen.getByText('electric')
		expect(typeText).toHaveClass('capitalize')
	})

	it('should have correct CSS classes for styling', () => {
		const { container } = render(<PokemonTypeBadge type="grass" />)

		const badge = container.querySelector('span[style]')
		expect(badge).toHaveClass(
			'flex',
			'items-center',
			'rounded-full',
			'pr-2',
			'font-bold',
			'text-body-md',
			'text-white',
		)
	})

	it('should render icon container with correct classes', () => {
		const { container } = render(<PokemonTypeBadge type="poison" />)

		const iconContainer = container.querySelector('.icon')
		expect(iconContainer).toBeInTheDocument()
		expect(iconContainer).toHaveClass('remove-shadowpoison', 'scale-75')
		expect(iconContainer).toHaveAttribute('title', 'poison')
	})

	it('should handle different Pokemon types', () => {
		const types = ['fire', 'water', 'grass', 'electric', 'psychic']

		types.forEach(type => {
			const { unmount } = render(<PokemonTypeBadge type={type} />)

			expect(screen.getByText(type)).toBeInTheDocument()
			expect(screen.getByAltText(type)).toHaveAttribute(
				'src',
				`/img/types/${type}.svg`,
			)

			unmount()
		})
	})

	it('should handle uppercase type names', () => {
		render(<PokemonTypeBadge type="FIRE" />)

		expect(screen.getByText('FIRE')).toBeInTheDocument()
		expect(screen.getByAltText('FIRE')).toHaveAttribute(
			'src',
			'/img/types/FIRE.svg',
		)
	})

	it('should handle mixed case type names', () => {
		render(<PokemonTypeBadge type="ElEcTrIc" />)

		expect(screen.getByText('ElEcTrIc')).toBeInTheDocument()
		expect(screen.getByAltText('ElEcTrIc')).toHaveAttribute(
			'src',
			'/img/types/ElEcTrIc.svg',
		)
	})

	it('should render unique badge for each type', () => {
		const { container } = render(<PokemonTypeBadge type="dragon" />)

		const badge = container.querySelector('span[style]')
		expect(badge).toBeInTheDocument()
		expect(screen.getByText('dragon')).toBeInTheDocument()
	})

	it('should render icon with correct title', () => {
		const { container } = render(<PokemonTypeBadge type="dark" />)

		const iconContainer = container.querySelector('.icon')
		expect(iconContainer).toHaveAttribute('title', 'dark')
	})

	it('should position type text with negative margin', () => {
		render(<PokemonTypeBadge type="fairy" />)

		const typeText = screen.getByText('fairy')
		expect(typeText).toHaveClass('ml-[-5px]')
	})

	it('should call getPokemonTypeColor with correct type', () => {
		const mockGetPokemonTypeColor = vi.mocked(getPokemonTypeColor)

		render(<PokemonTypeBadge type="ice" />)

		expect(mockGetPokemonTypeColor).toHaveBeenCalledWith('ice')
	})

	it('should handle special type names with hyphens', () => {
		render(<PokemonTypeBadge type="fighting" />)

		expect(screen.getByText('fighting')).toBeInTheDocument()
		expect(screen.getByAltText('fighting')).toHaveAttribute(
			'src',
			'/img/types/fighting.svg',
		)
	})

	it('should handle all valid Pokemon types', () => {
		const allTypes = [
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

		allTypes.forEach(type => {
			const { unmount } = render(<PokemonTypeBadge type={type} />)

			// Check that the badge renders correctly for each type
			expect(screen.getByText(type)).toBeInTheDocument()
			expect(screen.getByAltText(type)).toBeInTheDocument()

			unmount()
		})
	})

	it('should maintain accessibility with alt text for icons', () => {
		render(<PokemonTypeBadge type="steel" />)

		const icon = screen.getByRole('img')
		expect(icon).toHaveAttribute('alt', 'steel')
	})
})
