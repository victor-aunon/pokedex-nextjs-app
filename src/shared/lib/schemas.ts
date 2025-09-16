import { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { z } from 'zod'

const numToGeneration: { [key: number]: PokemonGenerations } = {
	1: PokemonGenerations.Generation1,
	2: PokemonGenerations.Generation2,
	3: PokemonGenerations.Generation3,
	4: PokemonGenerations.Generation4,
	5: PokemonGenerations.Generation5,
	6: PokemonGenerations.Generation6,
	7: PokemonGenerations.Generation7,
	8: PokemonGenerations.Generation8,
	9: PokemonGenerations.Generation9,
}

export const pokemonSearchSchema = z.object({
	type: z.enum(Object.values(PokemonTypes) as [string, ...string[]]).optional(),
	generation: z
		.enum(Object.values(PokemonGenerations) as [string, ...string[]])
		.optional()
		.or(
			z.coerce
				.number()
				.min(1)
				.max(9)
				.transform(val => numToGeneration[val]),
		)
		.optional(),
	itemsPerPage: z.coerce.number().min(1).int().optional(),
	page: z.coerce.number().min(1).int().optional(),
})
