import type { NameAndUrl } from './shared.types'

export type PokemonResponse = {
	abilities: Ability[]
	base_experience: number
	cries: Cries
	height: number // in dm
	id: number
	name: string
	species: NameAndUrl
	sprites: Sprites
	stats: Stat[]
	types: Type[]
	weight: number // in hg
}

type Ability = {
	ability: NameAndUrl | null
	is_hidden: boolean
	slot: number
}

type Cries = {
	latest: URLString
	legacy: URLString
}

type Sprites = {
	back_default: URLString | null
	back_female: URLString | null
	back_shiny: URLString | null
	back_shiny_female: URLString | null
	front_default: URLString | null
	front_female: URLString | null
	front_shiny: URLString | null
	front_shiny_female: URLString | null
	other: {
		dream_world: {
			front_default: URLString | null
			front_female: URLString | null
		}
		home: {
			front_default: URLString | null
			front_female: URLString | null
			front_shiny: URLString | null
			front_shiny_female: URLString | null
		}
		'official-artwork': {
			front_default: URLString | null
			front_shiny: URLString | null
		}
	}
}

type Stat = {
	base_stat: number
	effort: number
	stat: NameAndUrl
}

type Type = {
	slot: number
	type: NameAndUrl
}
