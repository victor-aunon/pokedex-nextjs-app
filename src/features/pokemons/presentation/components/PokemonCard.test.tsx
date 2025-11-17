import en from '@/dictionaries/en.json'
import PokemonCard from '@/features/pokemons/presentation/components/PokemonCard'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Next.js Link component
vi.mock('next/link', () => ({
	default: ({
		children,
		href,
		...props
	}: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}))

// Mock CSS file import
vi.mock('./PokemonCard.css', () => ({}))

const renderWithDictionary = (component: React.ReactElement) => {
	return render(
		<DictionaryProvider dictionary={en}>{component}</DictionaryProvider>,
	)
}

const mockPokemonProps = {
	avatarUrl: 'https://example.com/pikachu.png',
	name: 'pikachu',
	id: 25,
	generation: 'generation-i',
	types: ['electric'],
	className: 'custom-class',
	enableTilt: false,
	enableMobileTilt: false,
	lang: 'en' as const,
}

describe('PokemonCard', () => {
	beforeEach(() => {
		// Reset all mocks before each test
		vi.clearAllMocks()
	})

	it('should render Pokemon basic information correctly', () => {
		renderWithDictionary(<PokemonCard {...mockPokemonProps} />)

		// Check that Pokemon name is displayed
		expect(screen.getByText('PIKACHU')).toBeInTheDocument()

		// Check that Pokemon ID is displayed
		expect(screen.getByText('#')).toBeInTheDocument()
		expect(screen.getByText('25')).toBeInTheDocument()

		// Check that generation is displayed
		expect(screen.getByText('Gen')).toBeInTheDocument()
		expect(screen.getByText('GENERATION-I')).toBeInTheDocument()
	})

	it('should render Pokemon image with correct attributes', () => {
		renderWithDictionary(<PokemonCard {...mockPokemonProps} />)

		const avatarImage = screen.getByAltText('pikachu avatar')
		expect(avatarImage).toBeInTheDocument()
		expect(avatarImage).toHaveAttribute(
			'src',
			'https://example.com/pikachu.png',
		)
		expect(avatarImage).toHaveAttribute('loading', 'lazy')
	})

	it('should render Pokemon types correctly', () => {
		const multiTypeProps = {
			...mockPokemonProps,
			types: ['grass', 'poison'],
			name: 'bulbasaur',
		}

		renderWithDictionary(<PokemonCard {...multiTypeProps} />)

		// Check that type images are rendered
		const grassTypeImg = screen.getByAltText('Grass')
		const poisonTypeImg = screen.getByAltText('Poison')

		expect(grassTypeImg).toBeInTheDocument()
		expect(grassTypeImg).toHaveAttribute('src', 'img/types/grass.svg')

		expect(poisonTypeImg).toBeInTheDocument()
		expect(poisonTypeImg).toHaveAttribute('src', 'img/types/poison.svg')
	})

	it('should create correct navigation link', () => {
		renderWithDictionary(<PokemonCard {...mockPokemonProps} />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/en/pokemons/pikachu')
	})

	it('should display evolution indicator when evolutionPlace is provided', () => {
		const evolutionProps = {
			...mockPokemonProps,
			evolutionPlace: 2,
		}

		renderWithDictionary(<PokemonCard {...evolutionProps} />)

		expect(screen.getByText('Evo. 2')).toBeInTheDocument()
		expect(screen.getByTitle('Evolution level 2')).toBeInTheDocument()
	})

	it('should not display evolution indicator when evolutionPlace is not provided', () => {
		renderWithDictionary(<PokemonCard {...mockPokemonProps} />)

		expect(screen.queryByText(/Evo\./)).not.toBeInTheDocument()
	})

	it('should handle image error gracefully', () => {
		renderWithDictionary(<PokemonCard {...mockPokemonProps} />)

		const avatarImage = screen.getByAltText('pikachu avatar')

		// Simulate image load error
		fireEvent.error(avatarImage)

		// The image should be hidden when error occurs
		expect(avatarImage).toHaveStyle('display: none')
	})

	it('should apply custom className when provided', () => {
		const { container } = renderWithDictionary(
			<PokemonCard {...mockPokemonProps} />,
		)

		const wrapper = container.querySelector('.pc-card-wrapper')
		expect(wrapper).toHaveClass('custom-class')
	})

	it('should handle large Pokemon IDs correctly', () => {
		const largeIdProps = {
			...mockPokemonProps,
			id: 1234,
			name: 'test-pokemon',
		}

		renderWithDictionary(<PokemonCard {...largeIdProps} />)

		expect(screen.getByText('1234')).toBeInTheDocument()
	})

	it('should render with default props when optional props are not provided', () => {
		const minimalProps = {
			avatarUrl: 'https://example.com/pokemon.png',
			name: 'test',
			id: 1,
			generation: 'generation-i',
			types: ['normal'],
			lang: 'en' as const,
		}

		renderWithDictionary(<PokemonCard {...minimalProps} />)

		expect(screen.getByText('TEST')).toBeInTheDocument()
		expect(screen.getByText('1')).toBeInTheDocument()
	})

	it('should handle single character in Pokemon name', () => {
		const shortNameProps = {
			...mockPokemonProps,
			name: 'a',
		}

		renderWithDictionary(<PokemonCard {...shortNameProps} />)

		expect(screen.getByText('A')).toBeInTheDocument()
	})

	it('should render multiple evolution arrows when evolutionPlace > 1', () => {
		const evolutionProps = {
			...mockPokemonProps,
			evolutionPlace: 3,
		}

		const { container } = renderWithDictionary(
			<PokemonCard {...evolutionProps} />,
		)

		// Should have 3 evolution arrows
		const evolutionArrows = container.querySelectorAll('.evolution-arrow')
		expect(evolutionArrows).toHaveLength(3)
	})
})
