import type { NameAndUrl } from './shared.types'

export interface PokemonsListResponseDTO {
	count: number
	next: URLString | null
	previous: URLString | null
	results: NameAndUrl[]
}
