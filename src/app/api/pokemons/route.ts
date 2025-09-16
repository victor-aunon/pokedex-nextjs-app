import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import type { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { handleApiError } from '@/shared/api/error-handler'
import { pokemonSearchSchema } from '@/shared/lib/schemas'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const validationResult = pokemonSearchSchema.safeParse(
		Object.fromEntries(searchParams),
	)

	if (!validationResult.success) {
		return handleApiError(new Error('Invalid query parameters'), {
			resourceName: 'Pokemons',
			additionalContext: { errors: validationResult.error.flatten() },
		})
	}

	const { itemsPerPage, page, type, generation } = validationResult.data

	try {
		const pokemons = await getPokemonsListUseCase({
			itemsPerPage,
			page,
			generation: generation as PokemonGenerations,
			type: type as PokemonTypes,
		})
		return NextResponse.json(pokemons, { status: 200 })
	} catch (error) {
		return handleApiError(error, {
			resourceName: 'Pokemons',
			additionalContext: { itemsPerPage, page, type, generation },
		})
	}
}
