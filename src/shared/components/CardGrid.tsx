'use client'

import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import PokemonCard from '@/features/pokemons/presentation/components/PokemonCard'

export function CardGrid({ children }: { children: React.ReactNode }) {
	return (
		<main className="my-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-center justify-items-center gap-x-2 gap-y-[60px] p-2">
			{children}
		</main>
	)
}
