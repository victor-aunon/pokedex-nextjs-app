import NoResults from '@/features/pokemons/presentation/components/NoResults'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('NoResults Component', () => {
	it('should render default message when no props provided', () => {
		render(<NoResults />)

		expect(screen.getByText('No Pokémon Found')).toBeInTheDocument()
		expect(screen.getByText(/Even Magikarp couldn't find/)).toBeInTheDocument()
		expect(screen.getByText('🐟')).toBeInTheDocument()
	})

	it('should display query in message when provided', () => {
		render(<NoResults query="pikachu" />)

		expect(screen.getByText('No results found for')).toBeInTheDocument()
		expect(screen.getByText('"pikachu"')).toBeInTheDocument()
	})

	it('should show different message when filters are active', () => {
		render(<NoResults hasActiveFilters={true} />)

		expect(
			screen.getByText(/Your current filters didn't match/),
		).toBeInTheDocument()
	})

	it('should render clear filters button when filters are active and callback provided', () => {
		const mockClearFilters = vi.fn()

		render(
			<NoResults hasActiveFilters={true} onClearFilters={mockClearFilters} />,
		)

		const clearButton = screen.getByRole('button', { name: /clear filters/i })
		expect(clearButton).toBeInTheDocument()
	})

	it('should not render clear filters button when no callback provided', () => {
		render(<NoResults hasActiveFilters={true} />)

		const clearButton = screen.queryByRole('button', { name: /clear filters/i })
		expect(clearButton).not.toBeInTheDocument()
	})

	it('should render search suggestions', () => {
		render(<NoResults />)

		expect(
			screen.getByText(/Try searching for "Pikachu" or "Blastoise"/),
		).toBeInTheDocument()
	})

	it('should have proper accessibility attributes', () => {
		render(<NoResults />)

		const heading = screen.getByRole('heading', { name: /no pokémon found/i })
		expect(heading).toBeInTheDocument()
	})
})
