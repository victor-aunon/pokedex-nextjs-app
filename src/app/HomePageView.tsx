'use client'

import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonGenerations } from '@/features/pokemons/domain/enums/generations.enum'
import type { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import {
	NoResults,
	PokemonCard,
	SearchAndFilterNav,
} from '@/features/pokemons/presentation/components'
import { usePagination } from '@/features/pokemons/presentation/hooks/usePagination'
import { CardGrid } from '@/shared/components/ui/atoms/CardGrid'
import { UIPagination } from '@/shared/components/ui/molecules/Pagination'

interface HomePageViewProps {
	pokemons: Pokemon[]
	itemsPerPage: number
	page: number
	query: string
	type: PokemonTypes
	generation: PokemonGenerations
}

export function HomePageView({
	pokemons,
	page,
	query,
	type,
	generation,
	itemsPerPage,
}: HomePageViewProps) {
	const {
		queryState,
		filtersState,
		currentPage,
		totalPages,
		paginatedFilteredPokemons,
		handleQueryChange,
		handleFiltersChange,
		handlePageChange,
	} = usePagination({
		page,
		query,
		type,
		generation,
		items: pokemons,
		itemsPerPage,
	})

	return (
		<>
			<SearchAndFilterNav
				queryState={queryState || ''}
				filtersState={filtersState}
				handleQueryChange={handleQueryChange}
				handleFiltersChange={handleFiltersChange}
			/>
			{paginatedFilteredPokemons.length === 0 ? (
				<NoResults
					query={queryState || ''}
					hasActiveFilters={!!filtersState.type || !!filtersState.generation}
					onClearFilters={() =>
						handleFiltersChange({ type: null, generation: null })
					}
				/>
			) : (
				<>
					<UIPagination
						totalPages={totalPages}
						currentPage={currentPage}
						setCurrentPage={handlePageChange}
						className="mb-8"
					/>
					<CardGrid>
						{paginatedFilteredPokemons.map(pokemon => (
							<PokemonCard
								key={pokemon.id}
								id={pokemon.id}
								types={pokemon.types}
								generation={pokemon.generation}
								avatarUrl={pokemon.image || ''}
								mobileTiltSensitivity={1}
								name={pokemon.name}
								grainUrl="https://reactbits.dev/assets/grain.webp"
								showBehindGradient={false}
								className="scale-65 w-xl:scale-100 lg:scale-75"
							/>
						))}
					</CardGrid>
				</>
			)}
		</>
	)
}
