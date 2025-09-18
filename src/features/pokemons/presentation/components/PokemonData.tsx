import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import Card from '@/shared/components/ui/molecules/Card'
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
		<section className="grid grid-cols-2 gap-4">
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
				<Card.TextContent className="text-center capitalize">
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
