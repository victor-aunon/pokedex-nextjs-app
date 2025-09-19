import { getPokemonChainByNameUseCase } from '@/features/pokemons/application/get-pokemon-chain-by-name.usecase'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { PokemonPageSkeleton } from './PokemonPageSkeleton'
import { PokemonPageView } from './PokemonPageView'

interface PageProps {
	params: Promise<{ name: string }>
}

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const name = (await params).name

	return {
		title: `Pokédex - ${name}`,
		description: `Detalles sobre ${name}`,
	}
}

export default async function PokemonPage({ params }: PageProps) {
	const { name } = await params

	const pokemonChain = await getPokemonChainByNameUseCase(name)

	// El primer Pokémon en la cadena es el que buscamos
	const currentPokemon =
		pokemonChain.find(p => p.name.toLowerCase() === name.toLowerCase()) ||
		pokemonChain[0]

	if (!currentPokemon) {
		notFound()
	}

	return (
		<Suspense fallback={<PokemonPageSkeleton />}>
			<PokemonPageView
				currentPokemon={currentPokemon}
				pokemonChain={pokemonChain}
			/>
		</Suspense>
	)
}
