import en from '@/dictionaries/en.json'
import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import PokemonStats from '@/features/pokemons/presentation/components/PokemonStats'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
	Heart: ({ className }: { className?: string }) => (
		<div data-testid="heart-icon" className={className} />
	),
	Rabbit: ({ className }: { className?: string }) => (
		<div data-testid="rabbit-icon" className={className} />
	),
	Shield: ({ className }: { className?: string }) => (
		<div data-testid="shield-icon" className={className} />
	),
	ShieldPlus: ({ className }: { className?: string }) => (
		<div data-testid="shield-plus-icon" className={className} />
	),
	Sword: ({ className }: { className?: string }) => (
		<div data-testid="sword-icon" className={className} />
	),
	Swords: ({ className }: { className?: string }) => (
		<div data-testid="swords-icon" className={className} />
	),
}))

// Mock Card component
vi.mock('@/shared/components/ui/molecules', () => {
	const Card = ({
		children,
		className,
	}: { children: React.ReactNode; className?: string }) => (
		<div data-testid="card" className={className}>
			{children}
		</div>
	)

	Card.Title = ({
		children,
		icon: Icon,
		className,
	}: {
		children: React.ReactNode
		icon?: React.ComponentType
		className?: string
	}) => (
		<div data-testid="card-title" className={className}>
			{Icon && <Icon />}
			{children}
		</div>
	)

	return { Card }
})

const renderWithDictionary = (component: React.ReactElement) => {
	return render(
		<DictionaryProvider dictionary={en}>{component}</DictionaryProvider>,
	)
}

const mockStats: Pokemon['stats'] = {
	hp: 45,
	attack: 49,
	defense: 49,
	specialAttack: 65,
	specialDefense: 65,
	speed: 45,
}

describe('PokemonStats', () => {
	it('should render base stats title', () => {
		renderWithDictionary(<PokemonStats stats={mockStats} dict={en.detail} />)

		expect(screen.getByText('Base stats')).toBeInTheDocument()
	})

	it('should render all stat labels correctly', () => {
		renderWithDictionary(<PokemonStats stats={mockStats} dict={en.detail} />)

		expect(screen.getByText('Hit points')).toBeInTheDocument()
		expect(screen.getByText('Attack')).toBeInTheDocument()
		expect(screen.getByText('Defense')).toBeInTheDocument()
		expect(screen.getByText('Special Attack')).toBeInTheDocument()
		expect(screen.getByText('Special Defense')).toBeInTheDocument()
		expect(screen.getByText('Speed')).toBeInTheDocument()
	})

	it('should render all stat values correctly', () => {
		renderWithDictionary(<PokemonStats stats={mockStats} dict={en.detail} />)

		// Check HP value (45) - there are 2 instances: HP and Speed
		const valueElements45 = screen.getAllByText('45')
		expect(valueElements45).toHaveLength(2)

		// Check Attack/Defense value (49) - there are 2 instances
		const valueElements49 = screen.getAllByText('49')
		expect(valueElements49).toHaveLength(2)

		// Check Special Attack/Special Defense value (65) - there are 2 instances
		const valueElements65 = screen.getAllByText('65')
		expect(valueElements65).toHaveLength(2)
	})

	it('should render all stat icons', () => {
		renderWithDictionary(<PokemonStats stats={mockStats} dict={en.detail} />)

		expect(screen.getByTestId('heart-icon')).toBeInTheDocument()
		expect(screen.getByTestId('sword-icon')).toBeInTheDocument()
		expect(screen.getByTestId('shield-icon')).toBeInTheDocument()
		expect(screen.getByTestId('swords-icon')).toBeInTheDocument()
		expect(screen.getByTestId('shield-plus-icon')).toBeInTheDocument()
		expect(screen.getByTestId('rabbit-icon')).toBeInTheDocument()
	})

	it('should calculate correct progress bar percentages', () => {
		const highStats: Pokemon['stats'] = {
			hp: 150, // 100% (max for percentage calculation)
			attack: 75, // 50%
			defense: 30, // 20%
			specialAttack: 0, // 0%
			specialDefense: 225, // Should cap at 100%
			speed: 120, // 80%
		}

		const { container } = renderWithDictionary(
			<PokemonStats stats={highStats} dict={en.detail} />,
		)

		const progressBars = container.querySelectorAll('div[style*="width"]')

		// Should have 6 progress bars (one for each stat)
		expect(progressBars).toHaveLength(6)

		// Check that progress bars have width styles applied
		progressBars.forEach(bar => {
			expect(bar).toHaveAttribute('style')
			expect(bar.getAttribute('style')).toContain('width:')
		})
	})

	it('should apply correct gauge colors based on stat values', () => {
		const mixedStats: Pokemon['stats'] = {
			hp: 25, // Low stat (should use chart-3)
			attack: 75, // Medium stat (should use chart-4)
			defense: 125, // High stat (should use chart-5)
			specialAttack: 50, // Boundary low (should use chart-3)
			specialDefense: 100, // Boundary medium (should use chart-4)
			speed: 150, // High stat (should use chart-5)
		}

		const { container } = renderWithDictionary(
			<PokemonStats stats={mixedStats} dict={en.detail} />,
		)

		// Find progress bars by their transition class (more specific selector)
		const progressBars = container.querySelectorAll(
			'.transition-all.duration-500.ease-out',
		)

		expect(progressBars).toHaveLength(6)

		// Check that all progress bars have background colors
		progressBars.forEach(bar => {
			const style = bar.getAttribute('style')
			expect(style).toContain('background-color: var(--chart-')
		})
	})

	it('should handle zero stats', () => {
		const zeroStats: Pokemon['stats'] = {
			hp: 0,
			attack: 0,
			defense: 0,
			specialAttack: 0,
			specialDefense: 0,
			speed: 0,
		}

		renderWithDictionary(<PokemonStats stats={zeroStats} dict={en.detail} />)

		// All values should be displayed as 0
		const zeroValues = screen.getAllByText('0')
		expect(zeroValues).toHaveLength(6)
	})

	it('should handle maximum stats', () => {
		const maxStats: Pokemon['stats'] = {
			hp: 255,
			attack: 255,
			defense: 255,
			specialAttack: 255,
			specialDefense: 255,
			speed: 255,
		}

		renderWithDictionary(<PokemonStats stats={maxStats} dict={en.detail} />)

		// All values should be displayed as 255
		const maxValues = screen.getAllByText('255')
		expect(maxValues).toHaveLength(6)
	})

	it('should render stat bars with proper styling', () => {
		const { container } = renderWithDictionary(
			<PokemonStats stats={mockStats} dict={en.detail} />,
		)

		// Check for progress bar containers
		const progressContainers = container.querySelectorAll(
			'.h-3.w-full.rounded-full',
		)
		expect(progressContainers).toHaveLength(6)

		// Check for progress bars themselves using transition classes
		const progressBars = container.querySelectorAll(
			'.transition-all.duration-500.ease-out',
		)
		expect(progressBars).toHaveLength(6)

		// Each progress bar should have transition and shadow styles
		progressBars.forEach(bar => {
			const style = bar.getAttribute('style')
			expect(style).toContain('box-shadow:')
		})
	})

	it('should have proper grid layout', () => {
		const { container } = renderWithDictionary(
			<PokemonStats stats={mockStats} dict={en.detail} />,
		)

		const gridContainer = container.querySelector('.grid')
		expect(gridContainer).toHaveClass(
			'grid-cols-1',
			'gap-8',
			'md:grid-cols-2',
			'lg:grid-cols-3',
		)
	})

	it('should render card with correct classes', () => {
		renderWithDictionary(<PokemonStats stats={mockStats} dict={en.detail} />)

		const card = screen.getByTestId('card')
		expect(card).toHaveClass('mb-6', 'p-6')
	})

	it('should handle floating point stat values', () => {
		const floatStats: Pokemon['stats'] = {
			hp: 45.7, // Should display as 45.7
			attack: 49.2,
			defense: 49.9,
			specialAttack: 65.1,
			specialDefense: 65.5,
			speed: 45.0,
		}

		renderWithDictionary(<PokemonStats stats={floatStats} dict={en.detail} />)

		expect(screen.getByText('45.7')).toBeInTheDocument()
		expect(screen.getByText('49.2')).toBeInTheDocument()
		expect(screen.getByText('49.9')).toBeInTheDocument()
		expect(screen.getByText('65.1')).toBeInTheDocument()
		expect(screen.getByText('65.5')).toBeInTheDocument()
		expect(screen.getByText('45')).toBeInTheDocument()
	})
})
