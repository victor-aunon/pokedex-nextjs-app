import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const pokemons = await getPokemonsListUseCase()
		return NextResponse.json(pokemons, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 })
	}
}
