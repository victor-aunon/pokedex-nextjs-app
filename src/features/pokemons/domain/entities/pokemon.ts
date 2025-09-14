export interface PokemonBase {
	id: number
	name: string
	image: URLString | null
	types: string[]
	sound: URLString | null
	heightInCm: number
	weightInKg: number
	stats: {
		hp: number
		attack: number
		defense: number
		specialAttack: number
		specialDefense: number
		speed: number
	}
}

export interface PokemonGenerationDescriptionOddity {
	evolutionChain: number | null
	generation: string
	description: string | null
	isLegendary: boolean
	isMythical: boolean
}

export interface PokemonItem
	extends PokemonBase,
		PokemonGenerationDescriptionOddity {}

export interface Pokemon extends PokemonItem {
	evolutions: PokemonItem[]
}
