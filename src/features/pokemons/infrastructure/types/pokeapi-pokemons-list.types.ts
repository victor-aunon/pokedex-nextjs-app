import type { NameAndUrl } from './shared.types'

export type PokemonsListResponse = {
	count: number
	next: URLString | null
	previous: URLString | null
	results: NameAndUrl[]
}
