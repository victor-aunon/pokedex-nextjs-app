import SearchAndFilterNav from '@/features/pokemons/presentation/components/SearchAndFilterNav'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Lucide React X icon
vi.mock('lucide-react', () => ({
	X: ({ className }: { className?: string }) => (
		<div data-testid="x-icon" className={className} />
	),
}))

// Mock UI components
vi.mock('@/shared/components/ui/atoms/Button', () => ({
	Button: ({
		children,
		onClick,
		variant,
		size,
	}: {
		children: React.ReactNode
		onClick?: () => void
		variant?: string
		size?: string
	}) => (
		<button
			type="button"
			onClick={onClick}
			data-testid="clear-filters-button"
			data-variant={variant}
			data-size={size}
		>
			{children}
		</button>
	),
}))

vi.mock('@/shared/components/ui/atoms/InputSearch', () => ({
	InputSearch: ({
		name,
		placeholder,
		className,
		onChange,
		value,
	}: {
		name: string
		placeholder: string
		className?: string
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
		value: string
	}) => (
		<input
			name={name}
			placeholder={placeholder}
			className={className}
			onChange={onChange}
			value={value}
			data-testid="search-input"
		/>
	),
}))

vi.mock('@/shared/components/ui/atoms/Select', () => ({
	Select: ({
		children,
		onValueChange,
		value,
	}: {
		children: React.ReactNode
		onValueChange: (value: string) => void
		value: string
	}) => (
		<div data-testid="select" data-value={value}>
			<button type="button" onClick={() => onValueChange('test-value')}>
				{children}
			</button>
		</div>
	),
	SelectContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="select-content">{children}</div>
	),
	SelectItem: ({
		children,
		value,
		className,
	}: {
		children: React.ReactNode
		value: string
		className?: string
	}) => (
		<div data-testid="select-item" data-value={value} className={className}>
			{children}
		</div>
	),
	SelectTrigger: ({
		children,
		className,
	}: {
		children: React.ReactNode
		className?: string
	}) => (
		<div data-testid="select-trigger" className={className}>
			{children}
		</div>
	),
	SelectValue: ({ placeholder }: { placeholder: string }) => (
		<span data-testid="select-value">{placeholder}</span>
	),
}))

vi.mock('@/shared/components/ui/molecules', () => ({
	Card: ({
		children,
		className,
	}: { children: React.ReactNode; className?: string }) => (
		<div data-testid="card" className={className}>
			{children}
		</div>
	),
}))

// Mock enums
vi.mock('@/features/pokemons/domain/enums/types.enum', () => ({
	PokemonTypes: {
		Bug: 'bug',
		Dark: 'dark',
		Dragon: 'dragon',
		Electric: 'electric',
		Fairy: 'fairy',
		Fighting: 'fighting',
		Fire: 'fire',
		Flying: 'flying',
		Ghost: 'ghost',
		Grass: 'grass',
		Ground: 'ground',
		Ice: 'ice',
		Normal: 'normal',
		Poison: 'poison',
		Psychic: 'psychic',
		Rock: 'rock',
		Steel: 'steel',
		Water: 'water',
	},
}))

vi.mock('@/features/pokemons/domain/enums/generations.enum', () => ({
	PokemonGenerations: {
		GenerationI: 'generation-i',
		GenerationII: 'generation-ii',
		GenerationIII: 'generation-iii',
		GenerationIV: 'generation-iv',
		GenerationV: 'generation-v',
		GenerationVI: 'generation-vi',
		GenerationVII: 'generation-vii',
		GenerationVIII: 'generation-viii',
		GenerationIX: 'generation-ix',
	},
}))

describe('SearchAndFilterNav', () => {
	const mockHandleQueryChange = vi.fn()
	const mockHandleFiltersChange = vi.fn()

	const defaultProps = {
		queryState: '',
		filtersState: {
			type: null,
			generation: null,
		},
		handleQueryChange: mockHandleQueryChange,
		handleFiltersChange: mockHandleFiltersChange,
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should render search input with correct attributes', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const searchInput = screen.getByTestId('search-input')
		expect(searchInput).toBeInTheDocument()
		expect(searchInput).toHaveAttribute('name', 'search')
		expect(searchInput).toHaveAttribute('placeholder', 'Search Pokémon...')
		expect(searchInput).toHaveValue('')
	})

	it('should render clear filters button', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const clearButton = screen.getByTestId('clear-filters-button')
		expect(clearButton).toBeInTheDocument()
		expect(screen.getByText('Clear filters')).toBeInTheDocument()
		expect(screen.getByTestId('x-icon')).toBeInTheDocument()
	})

	it('should render type and generation selects', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const selects = screen.getAllByTestId('select')
		expect(selects).toHaveLength(2)

		expect(screen.getByText('Select a type')).toBeInTheDocument()
		expect(screen.getByText('Select a generation')).toBeInTheDocument()
	})

	it('should call handleQueryChange when search input changes', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const searchInput = screen.getByTestId('search-input')
		fireEvent.change(searchInput, { target: { value: 'pikachu' } })

		expect(mockHandleQueryChange).toHaveBeenCalledWith('pikachu')
	})

	it('should call handleFiltersChange when clear filters button is clicked', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const clearButton = screen.getByTestId('clear-filters-button')
		fireEvent.click(clearButton)

		expect(mockHandleFiltersChange).toHaveBeenCalledWith({
			type: null,
			generation: null,
		})
	})

	it('should display current query value in search input', () => {
		const propsWithQuery = {
			...defaultProps,
			queryState: 'bulbasaur',
		}

		render(<SearchAndFilterNav {...propsWithQuery} />)

		const searchInput = screen.getByTestId('search-input')
		expect(searchInput).toHaveValue('bulbasaur')
	})

	it('should display current filter values in selects', () => {
		const propsWithFilters = {
			...defaultProps,
			filtersState: {
				type: 'fire',
				generation: 'generation-i',
			},
		}

		render(<SearchAndFilterNav {...propsWithFilters} />)

		const selects = screen.getAllByTestId('select')
		expect(selects[0]).toHaveAttribute('data-value', 'fire')
		expect(selects[1]).toHaveAttribute('data-value', 'generation-i')
	})

	it('should render all Pokemon types in type select', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		// Check that all Pokemon types are rendered as select items
		const typeItems = screen.getAllByTestId('select-item')

		// There should be items for types and generations
		expect(typeItems.length).toBeGreaterThan(0)

		// Check for some specific types
		const fireType = typeItems.find(
			item => item.getAttribute('data-value') === 'fire',
		)
		const waterType = typeItems.find(
			item => item.getAttribute('data-value') === 'water',
		)

		expect(fireType).toBeInTheDocument()
		expect(waterType).toBeInTheDocument()
	})

	it('should render all Pokemon generations in generation select', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const generationItems = screen.getAllByTestId('select-item')

		// Check for specific generations
		const genI = generationItems.find(
			item => item.getAttribute('data-value') === 'generation-i',
		)
		const genII = generationItems.find(
			item => item.getAttribute('data-value') === 'generation-ii',
		)

		expect(genI).toBeInTheDocument()
		expect(genII).toBeInTheDocument()
	})

	it('should have correct CSS classes on Card', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const card = screen.getByTestId('card')
		expect(card).toHaveClass(
			'mb-8',
			'flex',
			'w-full',
			'flex-wrap',
			'justify-between',
			'gap-4',
		)
	})

	it('should have correct CSS classes on search input', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const searchInput = screen.getByTestId('search-input')
		expect(searchInput).toHaveClass('text-lg!')
	})

	it('should have correct button variant and size', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const clearButton = screen.getByTestId('clear-filters-button')
		expect(clearButton).toHaveAttribute('data-variant', 'default')
		expect(clearButton).toHaveAttribute('data-size', 'sm')
	})

	it('should handle empty query state gracefully', () => {
		const propsWithNullQuery = {
			...defaultProps,
			queryState: '', // Testing edge case with empty string instead of null
		}

		render(<SearchAndFilterNav {...propsWithNullQuery} />)

		const searchInput = screen.getByTestId('search-input')
		expect(searchInput).toHaveValue('')
	})

	it('should handle null filter states gracefully', () => {
		const propsWithNullFilters = {
			...defaultProps,
			filtersState: {
				type: null,
				generation: null,
			},
		}

		render(<SearchAndFilterNav {...propsWithNullFilters} />)

		const selects = screen.getAllByTestId('select')
		expect(selects[0]).toHaveAttribute('data-value', '')
		expect(selects[1]).toHaveAttribute('data-value', '')
	})

	it('should render select triggers with correct CSS classes', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const selectTriggers = screen.getAllByTestId('select-trigger')

		expect(selectTriggers[0]).toHaveClass('min-w-[110px]', 'text-md')
		expect(selectTriggers[1]).toHaveClass('min-w-[152px]', 'text-md')
	})

	it('should render select items with correct CSS classes', () => {
		render(<SearchAndFilterNav {...defaultProps} />)

		const selectItems = screen.getAllByTestId('select-item')

		selectItems.forEach(item => {
			expect(item).toHaveClass('text-md')
		})
	})

	it('should render section with correct CSS classes for filters', () => {
		const { container } = render(<SearchAndFilterNav {...defaultProps} />)

		const section = container.querySelector('section')
		expect(section).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-4')
	})
})
