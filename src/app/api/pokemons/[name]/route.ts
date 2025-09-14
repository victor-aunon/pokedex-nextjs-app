import { getPokemonChainByNameUseCase } from '@/features/pokemons/application/get-pokemon-chain-by-name.usecase'
import { handleApiError } from '@/shared/api/error-handler'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(
	_req: NextRequest,
	ctx: RouteContext<'/api/pokemons/[name]'>,
) {
	const { name } = await ctx.params
	try {
		const pokemons = await getPokemonChainByNameUseCase(name)
		return NextResponse.json(pokemons, { status: 200 })
	} catch (error) {
		return handleApiError(error, {
			resourceName: 'Pokemon',
			resourceId: name,
		})
	}
}
