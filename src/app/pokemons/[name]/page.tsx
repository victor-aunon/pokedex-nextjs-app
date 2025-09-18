import { getPokemonChainByNameUseCase } from '@/features/pokemons/application/get-pokemon-chain-by-name.usecase'
import { PokemonPageView } from './PokemonPageView'

import { notFound } from 'next/navigation'

interface PageProps {
	params: Promise<{ name: string }>
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
		<PokemonPageView
			currentPokemon={currentPokemon}
			pokemonChain={pokemonChain}
		/>
	)
}
