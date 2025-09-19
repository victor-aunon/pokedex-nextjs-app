'use client'

import { getPokemonTypeColor } from '@/shared/lib/pokemon-utils'

export default function PokemonTypeBadge({ type }: { type: string }) {
	return (
		<span
			key={type}
			className="flex items-center rounded-full pr-2 font-bold text-body-md text-white"
			style={{ backgroundColor: getPokemonTypeColor(type) }}
		>
			<div
				className={`icon remove-shadow${type} scale-75`}
				key={`pokemon-${type}`}
				title={type}
			>
				<img src={`/img/types/${type}.svg`} alt={type} />
			</div>
			<span className="ml-[-5px] capitalize">{type}</span>
		</span>
	)
}
