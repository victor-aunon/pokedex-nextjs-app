import { http, HttpResponse } from 'msw'

// Mock data
const mockPokemonList = {
	count: 1302,
	next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
	previous: null,
	results: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/',
		},
		{
			name: 'ivysaur',
			url: 'https://pokeapi.co/api/v2/pokemon/2/',
		},
		{
			name: 'venusaur',
			url: 'https://pokeapi.co/api/v2/pokemon/3/',
		},
		{
			name: 'charmander',
			url: 'https://pokeapi.co/api/v2/pokemon/4/',
		},
		{
			name: 'charmeleon',
			url: 'https://pokeapi.co/api/v2/pokemon/5/',
		},
	],
}

const mockPokemonDetails = {
	id: 1,
	name: 'bulbasaur',
	base_experience: 64,
	height: 7,
	weight: 69,
	sprites: {
		front_default:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		other: {
			'official-artwork': {
				front_default:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
			},
		},
	},
	types: [
		{
			slot: 1,
			type: {
				name: 'grass',
				url: 'https://pokeapi.co/api/v2/type/12/',
			},
		},
		{
			slot: 2,
			type: {
				name: 'poison',
				url: 'https://pokeapi.co/api/v2/type/4/',
			},
		},
	],
	stats: [
		{
			base_stat: 45,
			effort: 0,
			stat: {
				name: 'hp',
				url: 'https://pokeapi.co/api/v2/stat/1/',
			},
		},
		{
			base_stat: 49,
			effort: 0,
			stat: {
				name: 'attack',
				url: 'https://pokeapi.co/api/v2/stat/2/',
			},
		},
		{
			base_stat: 49,
			effort: 0,
			stat: {
				name: 'defense',
				url: 'https://pokeapi.co/api/v2/stat/3/',
			},
		},
		{
			base_stat: 65,
			effort: 1,
			stat: {
				name: 'special-attack',
				url: 'https://pokeapi.co/api/v2/stat/4/',
			},
		},
		{
			base_stat: 65,
			effort: 0,
			stat: {
				name: 'special-defense',
				url: 'https://pokeapi.co/api/v2/stat/5/',
			},
		},
		{
			base_stat: 45,
			effort: 0,
			stat: {
				name: 'speed',
				url: 'https://pokeapi.co/api/v2/stat/6/',
			},
		},
	],
}

const mockPokemonSpecies = {
	id: 1,
	name: 'bulbasaur',
	generation: {
		name: 'generation-i',
		url: 'https://pokeapi.co/api/v2/generation/1/',
	},
	flavor_text_entries: [
		{
			flavor_text:
				'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
			language: {
				name: 'en',
				url: 'https://pokeapi.co/api/v2/language/9/',
			},
		},
	],
	evolution_chain: {
		url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
	},
	is_legendary: false,
	is_mythical: false,
}

const mockEvolutionChain = {
	id: 1,
	chain: {
		species: {
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
		},
		evolves_to: [
			{
				species: {
					name: 'ivysaur',
					url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
				},
				evolves_to: [
					{
						species: {
							name: 'venusaur',
							url: 'https://pokeapi.co/api/v2/pokemon-species/3/',
						},
						evolves_to: [],
					},
				],
			},
		],
	},
}

export const handlers = [
	// Get Pokemon list
	http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
		const url = new URL(request.url)
		const limit = url.searchParams.get('limit') || '20'
		const offset = url.searchParams.get('offset') || '0'

		return HttpResponse.json({
			...mockPokemonList,
			results: mockPokemonList.results.slice(
				Number(offset),
				Number(offset) + Number(limit),
			),
		})
	}),

	// Get Pokemon details
	http.get('https://pokeapi.co/api/v2/pokemon/:nameOrId', ({ params }) => {
		const { nameOrId } = params

		if (nameOrId === 'bulbasaur' || nameOrId === '1') {
			return HttpResponse.json(mockPokemonDetails)
		}

		return HttpResponse.json({ error: 'Pokemon not found' }, { status: 404 })
	}),

	// Get Pokemon species
	http.get(
		'https://pokeapi.co/api/v2/pokemon-species/:nameOrId',
		({ params }) => {
			const { nameOrId } = params

			if (nameOrId === 'bulbasaur' || nameOrId === '1') {
				return HttpResponse.json(mockPokemonSpecies)
			}

			return HttpResponse.json({ error: 'Species not found' }, { status: 404 })
		},
	),

	// Get Evolution chain
	http.get('https://pokeapi.co/api/v2/evolution-chain/:id', ({ params }) => {
		const { id } = params

		if (id === '1') {
			return HttpResponse.json(mockEvolutionChain)
		}

		return HttpResponse.json(
			{ error: 'Evolution chain not found' },
			{ status: 404 },
		)
	}),
]
