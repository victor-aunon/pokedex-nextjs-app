'use client'

import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { getPokemonTypeColor } from '@/shared/lib/pokemon-utils'
import { useDictionary } from '@/shared/providers/DictionaryProvider'

export default function PokemonTypeBadge({ type }: { type: string }) {
	const dict = useDictionary()

	return (
		<span
			key={type}
			className="flex items-center rounded-full pr-2 font-bold text-body-md text-white"
			style={{ backgroundColor: getPokemonTypeColor(type) }}
		>
			<div
				className={`icon remove-shadow${type} scale-75`}
				key={`pokemon-${type}`}
				title={dict.types[type as PokemonTypes]}
			>
				<img
					src={`/img/types/${type}.svg`}
					alt={dict.types[type as PokemonTypes]}
				/>
			</div>
			<span className="ml-[-5px] capitalize">
				{dict.types[type as PokemonTypes]}
			</span>
		</span>
	)
}
