import PokemonData from '@/features/pokemons/presentation/components/PokemonData'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
	CalendarClock: () => <div data-testid="calendar-clock-icon" />,
	Dna: () => <div data-testid="dna-icon" />,
	Ruler: () => <div data-testid="ruler-icon" />,
	Weight: () => <div data-testid="weight-icon" />,
}))

// Mock Card component
vi.mock('@/shared/components/ui/molecules', () => {
	const Card = ({ children }: { children: React.ReactNode }) => (
		<div data-testid="card">{children}</div>
	)

	Card.Title = ({
		children,
		icon: Icon,
	}: { children: React.ReactNode; icon: React.ComponentType }) => (
		<div data-testid="card-title">
			{Icon && <Icon />}
			{children}
		</div>
	)

	Card.TextContent = ({
		children,
		className,
	}: { children: React.ReactNode; className?: string }) => (
		<div data-testid="card-content" className={className}>
			{children}
		</div>
	)

	return { Card }
})

const mockPokemonDataProps = {
	height: 70,
	weight: 6.9,
	generation: 'generation-i',
	species: 'Seed Pokémon',
}

describe('PokemonData', () => {
	it('should render all Pokemon data cards', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		// Check that all 4 cards are rendered
		const cards = screen.getAllByTestId('card')
		expect(cards).toHaveLength(4)
	})

	it('should display height information correctly', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		expect(screen.getByText('Height')).toBeInTheDocument()
		expect(screen.getByText('70 cm')).toBeInTheDocument()
		expect(screen.getByTestId('ruler-icon')).toBeInTheDocument()
	})

	it('should display weight information correctly', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		expect(screen.getByText('Weight')).toBeInTheDocument()
		expect(screen.getByText('6.9 kg')).toBeInTheDocument()
		expect(screen.getByTestId('weight-icon')).toBeInTheDocument()
	})

	it('should display generation information correctly', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		expect(screen.getByText('Generation')).toBeInTheDocument()
		expect(screen.getByText('generation-i')).toBeInTheDocument()
		expect(screen.getByTestId('calendar-clock-icon')).toBeInTheDocument()
	})

	it('should display species information correctly', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		expect(screen.getByText('Species')).toBeInTheDocument()
		expect(screen.getByText('Seed Pokémon')).toBeInTheDocument()
		expect(screen.getByTestId('dna-icon')).toBeInTheDocument()
	})

	it('should handle decimal weight values', () => {
		const decimalWeightProps = {
			...mockPokemonDataProps,
			weight: 25.5,
		}

		render(<PokemonData {...decimalWeightProps} />)

		expect(screen.getByText('25.5 kg')).toBeInTheDocument()
	})

	it('should handle large height values', () => {
		const largeHeightProps = {
			...mockPokemonDataProps,
			height: 1250,
		}

		render(<PokemonData {...largeHeightProps} />)

		expect(screen.getByText('1250 cm')).toBeInTheDocument()
	})

	it('should render generation with different formats', () => {
		const differentGenerationProps = {
			...mockPokemonDataProps,
			generation: 'generation-iv',
		}

		render(<PokemonData {...differentGenerationProps} />)

		expect(screen.getByText('generation-iv')).toBeInTheDocument()
	})

	it('should render species with different values', () => {
		const differentSpeciesProps = {
			...mockPokemonDataProps,
			species: 'Electric Mouse Pokémon',
		}

		render(<PokemonData {...differentSpeciesProps} />)

		expect(screen.getByText('Electric Mouse Pokémon')).toBeInTheDocument()
	})

	it('should apply correct CSS classes for centering content', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		const textContents = screen.getAllByTestId('card-content')
		textContents.forEach(content => {
			expect(content).toHaveClass('text-center')
		})
	})

	it('should apply capitalize class to generation and species', () => {
		render(<PokemonData {...mockPokemonDataProps} />)

		const textContents = screen.getAllByTestId('card-content')

		// Generation and Species cards should have capitalize class
		const generationCard = textContents.find(
			card => card.textContent === 'generation-i',
		)
		const speciesCard = textContents.find(
			card => card.textContent === 'Seed Pokémon',
		)

		expect(generationCard).toHaveClass('capitalize')
		expect(speciesCard).toHaveClass('capitalize')
	})
})
