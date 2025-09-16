import type { NameAndUrl } from './shared.types'

export interface PokemonSpeciesResponseDTO {
	evolution_chain: EvolutionChain
	evolves_from_species: NameAndUrl
	flavor_text_entries: FlavorTextEntry[]
	generation: NameAndUrl
	id: number
	is_baby: boolean
	is_legendary: boolean
	is_mythical: boolean
	name: string
	names: Name[]
}

type Language = {
	name: 'es' | 'en'
	url: URLString
}

type EvolutionChain = {
	url: URLString
}

type FlavorTextEntry = {
	flavor_text: string
	language: Language
}

type Name = {
	language: NameAndUrl
	name: string
}
