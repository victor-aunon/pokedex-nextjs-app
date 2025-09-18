import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import Card from '@/shared/components/ui/molecules/Card'
import {
	Heart,
	type LucideProps,
	Rabbit,
	Shield,
	ShieldPlus,
	Sword,
	Swords,
} from 'lucide-react'

interface PokemonStatsProps {
	stats: Pokemon['stats']
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
	const getGaugeColor = (value: number): string => {
		if (value <= 50) return 'var(--chart-3)'
		if (value <= 100) return 'var(--chart-4)'
		return 'var(--chart-5)'
	}

	const icons: Record<string, React.ComponentType<LucideProps>> = {
		hp: Heart,
		attack: Sword,
		defense: Shield,
		specialAttack: Swords,
		specialDefense: ShieldPlus,
		speed: Rabbit,
	}

	return (
		<Card className="mb-6 p-6">
			<h2 className="mb-6 text-card-foreground text-heading-md">Base Stats</h2>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{Object.entries(stats).map(([statName, value]) => {
					const statLabels: Record<string, string> = {
						hp: 'Hit points',
						attack: 'Attack',
						defense: 'Defense',
						specialAttack: 'Special Attack',
						specialDefense: 'Special Defense',
						speed: 'Speed',
					}

					const percentage = Math.min((value / 150) * 100, 100)

					return (
						<div key={statName} className="space-y-2">
							<div className="flex items-center justify-between">
								<Card.Title icon={icons[statName]} className="justify-between">
									{statLabels[statName]}
								</Card.Title>
								<span className="font-bold text-card-foreground text-lg">
									{value}
								</span>
							</div>
							<div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
								<div
									className="h-3 rounded-full transition-all duration-500 ease-out"
									style={{
										width: `${percentage}%`,
										backgroundColor: getGaugeColor(value),
										boxShadow: `0 2px 4px ${getGaugeColor(value)}40`,
									}}
								/>
							</div>
						</div>
					)
				})}
			</div>
		</Card>
	)
}
