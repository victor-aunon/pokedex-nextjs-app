import { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { Button } from '@/shared/components/ui/atoms/Button'
import { InputSearch } from '@/shared/components/ui/atoms/InputSearch'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/atoms/Select'
import { Card } from '@/shared/components/ui/molecules'
import { useDictionary } from '@/shared/providers/DictionaryProvider'
import { X } from 'lucide-react'

interface SearchAndFilterNavProps {
	queryState: string
	filtersState: {
		type: string | null
		generation: string | null
	}
	handleQueryChange: (query: string) => void
	handleFiltersChange: (
		filters: Partial<{
			type: PokemonTypes | null
			generation: string | null
		}>,
	) => void
}

export default function SearchAndFilterNav({
	queryState,
	filtersState,
	handleQueryChange,
	handleFiltersChange,
}: SearchAndFilterNavProps) {
	const dict = useDictionary()

	return (
		<Card className="mb-8 flex w-full flex-wrap justify-between gap-4">
			<InputSearch
				name="search"
				placeholder={dict.search.placeholder}
				className="text-lg!"
				onChange={e => handleQueryChange(e.target.value)}
				value={queryState || ''}
			/>
			<section className="flex flex-wrap items-center gap-4">
				<Button
					variant="default"
					size="sm"
					onClick={() => handleFiltersChange({ type: null, generation: null })}
				>
					<X className="h-4 w-4" />
					{dict.search.clear}
				</Button>
				<Select
					onValueChange={(value: PokemonTypes) =>
						handleFiltersChange({ type: value })
					}
					value={filtersState.type || ''}
				>
					<SelectTrigger className="min-w-[110px] text-md">
						<SelectValue placeholder={dict.search.selectType} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(PokemonTypes).map(pokemonType => (
							<SelectItem
								key={pokemonType}
								value={pokemonType}
								className="text-md"
							>
								<span>{dict.types[pokemonType]}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					onValueChange={(value: PokemonTypes) =>
						handleFiltersChange({ generation: value })
					}
					value={filtersState.generation || ''}
				>
					<SelectTrigger className="min-w-[152px] text-md">
						<SelectValue placeholder={dict.search.selectGeneration} />
					</SelectTrigger>
					<SelectContent>
						{Object.values(PokemonGenerations).map(generation => (
							<SelectItem
								key={generation}
								value={generation}
								className="text-md"
							>
								<span>{dict.search.generation}</span>
								<span className="uppercase">{generation.split('-')[1]}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</section>
		</Card>
	)
}
