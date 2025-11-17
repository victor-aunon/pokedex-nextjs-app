import en from '@/dictionaries/en.json'
import NoResults from '@/features/pokemons/presentation/components/NoResults'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const renderWithDictionary = (component: React.ReactElement) => {
	return render(
		<DictionaryProvider dictionary={en}>{component}</DictionaryProvider>,
	)
}

describe('NoResults Component', () => {
	it('should render default message when no props provided', () => {
		renderWithDictionary(<NoResults dict={en.noResults} />)

		expect(screen.getByText('No Pokémon Found')).toBeInTheDocument()
		expect(screen.getByText(/Even Magikarp couldn't find/)).toBeInTheDocument()
		expect(screen.getByText('🐟')).toBeInTheDocument()
	})

	it('should display query in message when provided', () => {
		renderWithDictionary(<NoResults dict={en.noResults} query="pikachu" />)

		expect(screen.getByText('No results found for')).toBeInTheDocument()
		expect(screen.getByText('"pikachu"')).toBeInTheDocument()
	})

	it('should show different message when filters are active', () => {
		renderWithDictionary(
			<NoResults dict={en.noResults} hasActiveFilters={true} />,
		)

		expect(
			screen.getByText(/Your current filters didn't match/),
		).toBeInTheDocument()
	})

	it('should render clear filters button when filters are active and callback provided', () => {
		const mockClearFilters = vi.fn()

		renderWithDictionary(
			<NoResults
				dict={en.noResults}
				hasActiveFilters={true}
				onClearFilters={mockClearFilters}
			/>,
		)

		const clearButton = screen.getByRole('button', { name: /clear filters/i })
		expect(clearButton).toBeInTheDocument()
	})

	it('should not render clear filters button when no callback provided', () => {
		renderWithDictionary(
			<NoResults dict={en.noResults} hasActiveFilters={true} />,
		)

		const clearButton = screen.queryByRole('button', { name: /clear filters/i })
		expect(clearButton).not.toBeInTheDocument()
	})

	it('should render search suggestions', () => {
		renderWithDictionary(<NoResults dict={en.noResults} />)

		expect(
			screen.getByText(/Try searching for "Pikachu" or "Blastoise"/),
		).toBeInTheDocument()
	})

	it('should have proper accessibility attributes', () => {
		renderWithDictionary(<NoResults dict={en.noResults} />)

		const heading = screen.getByRole('heading', { name: /no pokémon found/i })
		expect(heading).toBeInTheDocument()
	})
})
