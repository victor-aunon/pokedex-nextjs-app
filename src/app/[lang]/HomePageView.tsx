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
import type { Locale } from '@/i18n-config'
import { CardGrid } from '@/shared/components/ui/atoms/CardGrid'
import { UIPagination } from '@/shared/components/ui/molecules/Pagination'
import { useDictionary } from '@/shared/providers/DictionaryProvider'
import { useSearchParams } from 'next/navigation'

interface HomePageViewProps {
	pokemons: Pokemon[]
	itemsPerPage: number
	lang: Locale
}

export function HomePageView({
	pokemons,
	itemsPerPage,
	lang,
}: HomePageViewProps) {
	const dict = useDictionary()
	const searchParams = useSearchParams()
	const page = Number(searchParams.get('page') || '1') || 1
	const query = searchParams.get('query') || ''
	const type = (searchParams.get('type') as PokemonTypes) || ''
	const generation =
		(searchParams.get('generation') as PokemonGenerations) || ''

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

	const currentStateParams = new URLSearchParams()
	if (queryState) currentStateParams.set('query', queryState)
	if (filtersState.type) currentStateParams.set('type', filtersState.type)
	if (filtersState.generation)
		currentStateParams.set('generation', filtersState.generation)
	if (currentPage > 1) currentStateParams.set('page', currentPage.toString())

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
					dict={dict.noResults}
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
						dict={dict.pagination}
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
								searchParams={currentStateParams.toString()}
								lang={lang}
							/>
						))}
					</CardGrid>
				</>
			)}
		</>
	)
}
