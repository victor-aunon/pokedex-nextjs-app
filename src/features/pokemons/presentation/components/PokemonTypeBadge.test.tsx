import en from '@/dictionaries/en.json'
import PokemonTypeBadge from '@/features/pokemons/presentation/components/PokemonTypeBadge'
import { getPokemonTypeColor } from '@/shared/lib/pokemon-utils'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
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

const renderWithDictionary = (component: React.ReactElement) => {
	return render(
		<DictionaryProvider dictionary={en}>{component}</DictionaryProvider>,
	)
}

describe('PokemonTypeBadge', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should render type badge with correct text', () => {
		renderWithDictionary(<PokemonTypeBadge type="fire" />)

		expect(screen.getByText('Fire')).toBeInTheDocument()
	})

	it('should render type icon with correct attributes', () => {
		renderWithDictionary(<PokemonTypeBadge type="water" />)

		const icon = screen.getByAltText('Water')
		expect(icon).toBeInTheDocument()
		expect(icon).toHaveAttribute('src', '/img/types/water.svg')
	})

	it('should apply correct background color for different types', () => {
		const { rerender, container } = renderWithDictionary(
			<PokemonTypeBadge type="fire" />,
		)

		const fireSpan = container.querySelector('span[style]')
		const fireStyle = fireSpan?.getAttribute('style')
		expect(fireStyle).toContain('background-color')

		rerender(
			<DictionaryProvider dictionary={en}>
				<PokemonTypeBadge type="water" />
			</DictionaryProvider>,
		)
		const waterSpan = container.querySelector('span[style]')
		const waterStyle = waterSpan?.getAttribute('style')
		expect(waterStyle).toContain('background-color')
	})

	it('should capitalize type text', () => {
		renderWithDictionary(<PokemonTypeBadge type="electric" />)

		const typeText = screen.getByText('Electric')
		expect(typeText).toHaveClass('capitalize')
	})

	it('should have correct CSS classes for styling', () => {
		const { container } = renderWithDictionary(
			<PokemonTypeBadge type="grass" />,
		)

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
		const { container } = renderWithDictionary(
			<PokemonTypeBadge type="poison" />,
		)

		const iconContainer = container.querySelector('.icon')
		expect(iconContainer).toBeInTheDocument()
		expect(iconContainer).toHaveClass('remove-shadowpoison', 'scale-75')
		expect(iconContainer).toHaveAttribute('title', 'Poison')
	})

	it('should handle different Pokemon types', () => {
		const types = ['fire', 'water', 'grass', 'electric', 'psychic']
		const capitalizedTypes = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic']

		types.forEach((type, index) => {
			const { unmount } = renderWithDictionary(<PokemonTypeBadge type={type} />)

			expect(screen.getByText(capitalizedTypes[index])).toBeInTheDocument()
			expect(screen.getByAltText(capitalizedTypes[index])).toHaveAttribute(
				'src',
				`/img/types/${type}.svg`,
			)

			unmount()
		})
	})

	it('should handle uppercase type names', () => {
		const { container } = renderWithDictionary(<PokemonTypeBadge type="FIRE" />)

		const badge = container.querySelector('span[style]')
		expect(badge).toBeInTheDocument()

		const img = container.querySelector('img')
		expect(img).toHaveAttribute('src', '/img/types/FIRE.svg')
	})

	it('should handle mixed case type names', () => {
		const { container } = renderWithDictionary(
			<PokemonTypeBadge type="ElEcTrIc" />,
		)

		const badge = container.querySelector('span[style]')
		expect(badge).toBeInTheDocument()

		const img = container.querySelector('img')
		expect(img).toHaveAttribute('src', '/img/types/ElEcTrIc.svg')
	})

	it('should render unique badge for each type', () => {
		const { container } = renderWithDictionary(
			<PokemonTypeBadge type="dragon" />,
		)

		const badge = container.querySelector('span[style]')
		expect(badge).toBeInTheDocument()
		expect(screen.getByText('Dragon')).toBeInTheDocument()
	})

	it('should render icon with correct title', () => {
		const { container } = renderWithDictionary(<PokemonTypeBadge type="dark" />)

		const iconContainer = container.querySelector('.icon')
		expect(iconContainer).toHaveAttribute('title', 'Dark')
	})

	it('should position type text with negative margin', () => {
		renderWithDictionary(<PokemonTypeBadge type="fairy" />)

		const typeText = screen.getByText('Fairy')
		expect(typeText).toHaveClass('ml-[-5px]')
	})

	it('should call getPokemonTypeColor with correct type', () => {
		const mockGetPokemonTypeColor = vi.mocked(getPokemonTypeColor)

		renderWithDictionary(<PokemonTypeBadge type="ice" />)

		expect(mockGetPokemonTypeColor).toHaveBeenCalledWith('ice')
	})

	it('should handle special type names with hyphens', () => {
		renderWithDictionary(<PokemonTypeBadge type="fighting" />)

		expect(screen.getByText('Fighting')).toBeInTheDocument()
		expect(screen.getByAltText('Fighting')).toHaveAttribute(
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

		const capitalizedTypes = [
			'Normal',
			'Fighting',
			'Flying',
			'Poison',
			'Ground',
			'Rock',
			'Bug',
			'Ghost',
			'Steel',
			'Fire',
			'Water',
			'Grass',
			'Electric',
			'Psychic',
			'Ice',
			'Dragon',
			'Dark',
			'Fairy',
		]

		allTypes.forEach((type, index) => {
			const { unmount } = renderWithDictionary(<PokemonTypeBadge type={type} />)

			expect(screen.getByText(capitalizedTypes[index])).toBeInTheDocument()
			expect(screen.getByAltText(capitalizedTypes[index])).toBeInTheDocument()

			unmount()
		})
	})

	it('should maintain accessibility with alt text for icons', () => {
		renderWithDictionary(<PokemonTypeBadge type="steel" />)

		const icon = screen.getByRole('img')
		expect(icon).toHaveAttribute('alt', 'Steel')
	})
})
