import PokemonCard from '@/features/pokemons/presentation/components/PokemonCard'
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

const mockPokemonProps = {
	avatarUrl: 'https://example.com/pikachu.png',
	name: 'pikachu',
	id: 25,
	generation: 'generation-i',
	types: ['electric'],
	className: 'custom-class',
	enableTilt: false, // Disable tilt to avoid complex animations in tests
	enableMobileTilt: false,
}

describe('PokemonCard', () => {
	beforeEach(() => {
		// Reset all mocks before each test
		vi.clearAllMocks()
	})

	it('should render Pokemon basic information correctly', () => {
		render(<PokemonCard {...mockPokemonProps} />)

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
		render(<PokemonCard {...mockPokemonProps} />)

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

		render(<PokemonCard {...multiTypeProps} />)

		// Check that type images are rendered
		const grassTypeImg = screen.getByAltText('grass')
		const poisonTypeImg = screen.getByAltText('poison')

		expect(grassTypeImg).toBeInTheDocument()
		expect(grassTypeImg).toHaveAttribute('src', 'img/types/grass.svg')

		expect(poisonTypeImg).toBeInTheDocument()
		expect(poisonTypeImg).toHaveAttribute('src', 'img/types/poison.svg')
	})

	it('should create correct navigation link', () => {
		render(<PokemonCard {...mockPokemonProps} />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/pokemons/pikachu')
	})

	it('should display evolution indicator when evolutionPlace is provided', () => {
		const evolutionProps = {
			...mockPokemonProps,
			evolutionPlace: 2,
		}

		render(<PokemonCard {...evolutionProps} />)

		expect(screen.getByText('Evo. 2')).toBeInTheDocument()
		expect(screen.getByTitle('Evolution level 2')).toBeInTheDocument()
	})

	it('should not display evolution indicator when evolutionPlace is not provided', () => {
		render(<PokemonCard {...mockPokemonProps} />)

		expect(screen.queryByText(/Evo\./)).not.toBeInTheDocument()
	})

	it('should handle image error gracefully', () => {
		render(<PokemonCard {...mockPokemonProps} />)

		const avatarImage = screen.getByAltText('pikachu avatar')

		// Simulate image load error
		fireEvent.error(avatarImage)

		// The image should be hidden when error occurs
		expect(avatarImage).toHaveStyle('display: none')
	})

	it('should apply custom className when provided', () => {
		const { container } = render(<PokemonCard {...mockPokemonProps} />)

		const wrapper = container.querySelector('.pc-card-wrapper')
		expect(wrapper).toHaveClass('custom-class')
	})

	it('should handle large Pokemon IDs correctly', () => {
		const largeIdProps = {
			...mockPokemonProps,
			id: 1234,
			name: 'test-pokemon',
		}

		render(<PokemonCard {...largeIdProps} />)

		expect(screen.getByText('1234')).toBeInTheDocument()
	})

	it('should render with default props when optional props are not provided', () => {
		const minimalProps = {
			avatarUrl: 'https://example.com/pokemon.png',
			name: 'test',
			id: 1,
			generation: 'generation-i',
			types: ['normal'],
		}

		render(<PokemonCard {...minimalProps} />)

		expect(screen.getByText('TEST')).toBeInTheDocument()
		expect(screen.getByText('1')).toBeInTheDocument()
	})

	it('should handle single character in Pokemon name', () => {
		const shortNameProps = {
			...mockPokemonProps,
			name: 'a',
		}

		render(<PokemonCard {...shortNameProps} />)

		expect(screen.getByText('A')).toBeInTheDocument()
	})

	it('should render multiple evolution arrows when evolutionPlace > 1', () => {
		const evolutionProps = {
			...mockPokemonProps,
			evolutionPlace: 3,
		}

		const { container } = render(<PokemonCard {...evolutionProps} />)

		// Should have 3 evolution arrows
		const evolutionArrows = container.querySelectorAll('.evolution-arrow')
		expect(evolutionArrows).toHaveLength(3)
	})
})
