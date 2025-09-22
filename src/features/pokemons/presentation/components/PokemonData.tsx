import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import { Card } from '@/shared/components/ui/molecules'
import { CalendarClock, Dna, Ruler, Weight } from 'lucide-react'

interface PokemonDataProps {
	height: Pokemon['heightInCm']
	weight: Pokemon['weightInKg']
	generation: string
	species: Pokemon['species']
}

export default function PokemonData({
	height,
	weight,
	generation,
	species,
}: PokemonDataProps) {
	return (
		<section className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
			<Card>
				<Card.Title icon={Ruler}>Height</Card.Title>
				<Card.TextContent className="text-center">{height} cm</Card.TextContent>
			</Card>

			<Card>
				<Card.Title icon={Weight}>Weight</Card.Title>
				<Card.TextContent className="text-center">{weight} kg</Card.TextContent>
			</Card>

			<Card>
				<Card.Title icon={CalendarClock}>Generation</Card.Title>
				<Card.TextContent className="text-center uppercase">
					{generation}
				</Card.TextContent>
			</Card>

			<Card>
				<Card.Title icon={Dna}>Species</Card.Title>
				<Card.TextContent className="text-center capitalize">
					{species}
				</Card.TextContent>
			</Card>
		</section>
	)
}
