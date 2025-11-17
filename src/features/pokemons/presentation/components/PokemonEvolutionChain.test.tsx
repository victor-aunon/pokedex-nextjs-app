import en from '@/dictionaries/en.json'
import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import PokemonEvolutionChain from '@/features/pokemons/presentation/components/PokemonEvolutionChain'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock Next.js Link component
vi.mock('next/link', () => ({
	default: ({
		children,
		href,
	}: { children: React.ReactNode; href: string }) => (
		<a href={href}>{children}</a>
	),
}))

// Mock Lucide React Triangle icon
vi.mock('lucide-react', () => ({
	Triangle: () => <div data-testid="triangle-icon" />,
}))

// Mock Card component
vi.mock('@/shared/components/ui/molecules', () => ({
	Card: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="card">{children}</div>
	),
}))

const mockPokemonChain: PokemonItem[] = [
	{
		id: 1,
		name: 'bulbasaur',
		image: 'https://example.com/bulbasaur.png',
		types: ['grass', 'poison'],
		sound: 'https://example.com/bulbasaur.wav',
		heightInCm: 70,
		weightInKg: 6.9,
		species: 'Seed Pokémon',
		stats: {
			hp: 45,
			attack: 49,
			defense: 49,
			specialAttack: 65,
			specialDefense: 65,
			speed: 45,
		},
		evolutionChain: 1,
		generation: 'generation-i',
		description: 'A strange seed was planted on its back at birth.',
		isLegendary: false,
		isMythical: false,
	},
	{
		id: 2,
		name: 'ivysaur',
		image: 'https://example.com/ivysaur.png',
		types: ['grass', 'poison'],
		sound: 'https://example.com/ivysaur.wav',
		heightInCm: 100,
		weightInKg: 13,
		species: 'Seed Pokémon',
		stats: {
			hp: 60,
			attack: 62,
			defense: 63,
			specialAttack: 80,
			specialDefense: 80,
			speed: 60,
		},
		evolutionChain: 1,
		generation: 'generation-i',
		description:
			'When the bulb on its back grows large, the Pokémon seems to lose the ability to stand on its hind legs.',
		isLegendary: false,
		isMythical: false,
	},
	{
		id: 3,
		name: 'venusaur',
		image: 'https://example.com/venusaur.png',
		types: ['grass', 'poison'],
		sound: 'https://example.com/venusaur.wav',
		heightInCm: 200,
		weightInKg: 100,
		species: 'Seed Pokémon',
		stats: {
			hp: 80,
			attack: 82,
			defense: 83,
			specialAttack: 100,
			specialDefense: 100,
			speed: 80,
		},
		evolutionChain: 1,
		generation: 'generation-i',
		description:
			'Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
		isLegendary: false,
		isMythical: false,
	},
]

const renderWithDictionary = (component: React.ReactElement) => {
	return render(
		<DictionaryProvider dictionary={en}>{component}</DictionaryProvider>,
	)
}

describe('PokemonEvolutionChain', () => {
	it('should render evolution chain title', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="bulbasaur"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		expect(screen.getByText('Evolution Chain')).toBeInTheDocument()
	})

	it('should render all Pokemon in the chain', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="bulbasaur"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		// Check that all Pokemon names are displayed
		expect(screen.getByText('bulbasaur')).toBeInTheDocument()
		expect(screen.getByText('ivysaur')).toBeInTheDocument()
		expect(screen.getByText('venusaur')).toBeInTheDocument()

		// Check that all Pokemon IDs are displayed
		expect(screen.getByText('#1')).toBeInTheDocument()
		expect(screen.getByText('#2')).toBeInTheDocument()
		expect(screen.getByText('#3')).toBeInTheDocument()
	})

	it('should render Pokemon images with correct attributes', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="bulbasaur"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		const bulbasaurImage = screen.getByAltText('bulbasaur sprite')
		expect(bulbasaurImage).toBeInTheDocument()
		expect(bulbasaurImage).toHaveAttribute(
			'src',
			'https://example.com/bulbasaur.png',
		)

		const ivysaurImage = screen.getByAltText('ivysaur sprite')
		expect(ivysaurImage).toBeInTheDocument()
		expect(ivysaurImage).toHaveAttribute(
			'src',
			'https://example.com/ivysaur.png',
		)

		const venusaurImage = screen.getByAltText('venusaur sprite')
		expect(venusaurImage).toBeInTheDocument()
		expect(venusaurImage).toHaveAttribute(
			'src',
			'https://example.com/venusaur.png',
		)
	})

	it('should create correct navigation links for each Pokemon', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="bulbasaur"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		const links = screen.getAllByRole('link')
		expect(links).toHaveLength(3)

		expect(links[0]).toHaveAttribute('href', '/en/pokemons/bulbasaur')
		expect(links[1]).toHaveAttribute('href', '/en/pokemons/ivysaur')
		expect(links[2]).toHaveAttribute('href', '/en/pokemons/venusaur')
	})

	it('should highlight current Pokemon with triangle indicator', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="ivysaur"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		// Should have a triangle icon for the current Pokemon
		expect(screen.getByTestId('triangle-icon')).toBeInTheDocument()
	})

	it('should be case insensitive when matching current Pokemon', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="BULBASAUR"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		// Should still highlight bulbasaur even with uppercase name
		expect(screen.getByTestId('triangle-icon')).toBeInTheDocument()
	})

	it('should handle empty evolution chain', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="pikachu"
				pokemonChain={[]}
				dict={en.detail}
				lang="en"
			/>,
		)

		expect(screen.getByText('Evolution Chain')).toBeInTheDocument()
		expect(screen.queryByRole('link')).not.toBeInTheDocument()
	})

	it('should handle single Pokemon in chain', () => {
		const singlePokemonChain = mockPokemonChain.slice(0, 1)

		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="bulbasaur"
				pokemonChain={singlePokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		expect(screen.getByText('bulbasaur')).toBeInTheDocument()
		expect(screen.getByText('#1')).toBeInTheDocument()
		expect(screen.getAllByRole('link')).toHaveLength(1)
	})

	it('should handle Pokemon without image', () => {
		const chainWithoutImage = [
			{
				id: 1,
				name: 'test-pokemon',
				image: null,
				types: ['normal'],
				sound: null,
				heightInCm: 100,
				weightInKg: 50,
				species: 'test species',
				stats: {
					hp: 50,
					attack: 50,
					defense: 50,
					specialAttack: 50,
					specialDefense: 50,
					speed: 50,
				},
				evolutionChain: null,
				generation: 'I',
				description: 'Test description',
				isLegendary: false,
				isMythical: false,
			},
		]

		renderWithDictionary(
			<PokemonEvolutionChain
				pokemonChain={chainWithoutImage}
				currentPokemonName="test-pokemon"
				dict={en.detail}
				lang="en"
			/>,
		)

		const image = screen.getByAltText('test-pokemon sprite')
		// When image is null, component uses || '' which results in empty src attribute that gets omitted
		expect(image).toBeInTheDocument()
	})

	it('should not show triangle indicator when current Pokemon is not in chain', () => {
		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="pikachu"
				pokemonChain={mockPokemonChain}
				dict={en.detail}
				lang="en"
			/>,
		)

		expect(screen.queryByTestId('triangle-icon')).not.toBeInTheDocument()
	})

	it('should handle Pokemon names with special characters', () => {
		const specialCharacterPokemon: PokemonItem[] = [
			{
				id: 29,
				name: 'nidoran-f',
				image: 'https://example.com/nidoran-f.png',
				types: ['poison'],
				sound: 'https://example.com/nidoran-f.wav',
				heightInCm: 40,
				weightInKg: 7,
				species: 'Poison Pin Pokémon',
				stats: {
					hp: 55,
					attack: 47,
					defense: 52,
					specialAttack: 40,
					specialDefense: 40,
					speed: 41,
				},
				evolutionChain: 7,
				generation: 'generation-i',
				description: 'A Pokémon with a gentle nature.',
				isLegendary: false,
				isMythical: false,
			},
		]

		renderWithDictionary(
			<PokemonEvolutionChain
				currentPokemonName="nidoran-f"
				pokemonChain={specialCharacterPokemon}
				dict={en.detail}
				lang="en"
			/>,
		)

		expect(screen.getByText('nidoran-f')).toBeInTheDocument()
		expect(screen.getByText('#29')).toBeInTheDocument()
	})
})
