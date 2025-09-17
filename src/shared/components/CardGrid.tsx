'use client'
import type { PokemonItem } from '@/features/pokemons/domain/entities/pokemon'
import ProfileCard from '@/shared/components/ProfileCard'
import TiltedCard from '@/shared/components/TiltedCard'

export function CardGrid({ pokemons }: { pokemons: PokemonItem[] }) {
	return (
		<main className="my-auto grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(380px,1fr))] items-center gap-x-2 gap-y-[60px] p-2">
			{pokemons.map(pokemon => (
				// <TiltedCard
				//   key={pokemon.id}
				//   imageSrc={pokemon.image as string}
				//   rotateAmplitude={25}
				//   containerHeight="300px"
				//   containerWidth="300px"
				//   scaleOnHover={1.2}
				//   imageHeight="300px"
				//   imageWidth="300px"
				// />
				<ProfileCard
					key={pokemon.id}
					avatarUrl={pokemon.image || ''}
					enableTilt={true}
					showBehindGradient={false}
					name={pokemon.name.toUpperCase()}
				/>
			))}
		</main>
	)
}
