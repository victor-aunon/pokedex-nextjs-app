import type { NameAndUrl } from './shared.types'

export interface PokemonEvolutionChainResponseDTO {
	baby_trigger_item: null
	chain: Chain
	id: number
}

type Chain = {
	evolution_details: EvolutionDetail[]
	evolves_to: Chain[]
	is_baby: boolean
	species: NameAndUrl
}

type EvolutionDetail = {
	min_level: number
	needs_overworld_rain: boolean
	turn_upside_down: boolean
}
