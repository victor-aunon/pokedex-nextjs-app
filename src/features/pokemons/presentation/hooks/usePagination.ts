'use client'

import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

interface usePaginationProps {
	page: number
	itemsPerPage: number
	items: Pokemon[]
	query: string
	type: PokemonTypes
	generation: string
}

export function usePagination({
	page,
	query,
	type,
	generation,
	items,
	itemsPerPage,
}: usePaginationProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [queryState, setQueryState] = useState(query || null)
	const [filtersState, setFiltersState] = useState<{
		type: usePaginationProps['type'] | null
		generation: usePaginationProps['generation'] | null
	}>({
		type: type || null,
		generation: generation || null,
	})
	const [currentPage, setCurrentPage] = useState(page || 1)

	// Track previous filter values to detect changes
	const prevFiltersRef = useRef(filtersState)

	const filteredPokemons = useMemo(() => {
		let filteredPokemons = items

		if (queryState) {
			const coincidences = filteredPokemons
				.filter(pokemon =>
					pokemon.name.toLowerCase().includes(queryState.toLowerCase()),
				)
				.flatMap(pokemon => pokemon.evolutions)
			filteredPokemons = Array.from(new Set(coincidences)) as Pokemon[]
		}

		if (filtersState.type) {
			filteredPokemons = filteredPokemons.filter(pokemon =>
				pokemon.types.includes(filtersState.type as string),
			)
		}
		if (filtersState.generation) {
			filteredPokemons = filteredPokemons.filter(
				pokemon =>
					pokemon.generation.toLowerCase() ===
					filtersState.generation?.toLowerCase().split('-')[1],
			)
		}
		return filteredPokemons
	}, [items, filtersState, queryState])

	const paginatedFilteredPokemons = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage

		return filteredPokemons.slice(startIndex, endIndex)
	}, [filteredPokemons, itemsPerPage, currentPage])

	const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage)

	// Reset page to 1 when current page is out of range
	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1)
		}
	}, [currentPage, totalPages])

	function handleQueryChange(newQuery: string) {
		const currentParams = new URLSearchParams(searchParams.toString())

		if (!newQuery) currentParams.delete('query')
		else currentParams.set('query', newQuery)

		currentParams.delete('page') // Reset page when query changes
		setCurrentPage(1)

		router.push(`?${currentParams.toString()}`)
		setQueryState(newQuery)
	}

	function handleFiltersChange(
		newFilters: Partial<{
			type: usePaginationProps['type'] | null
			generation: usePaginationProps['generation'] | null
		}>,
	) {
		const currentParams = new URLSearchParams(searchParams.toString())

		// Update the filters state first to get current values
		const updatedFilters = { ...filtersState, ...newFilters }

		// Update URL params based on the complete filter state
		if (!updatedFilters.type) currentParams.delete('type')
		else currentParams.set('type', updatedFilters.type)

		if (!updatedFilters.generation) currentParams.delete('generation')
		else currentParams.set('generation', updatedFilters.generation)

		currentParams.delete('page') // Reset page when filters change
		setCurrentPage(1)

		router.push(`?${currentParams.toString()}`)
		setFiltersState(updatedFilters)
	}

	function handlePageChange(newPage: number) {
		const currentParams = new URLSearchParams(searchParams.toString())

		if (newPage === 1) currentParams.delete('page')
		else currentParams.set('page', newPage.toString())

		router.push(`?${currentParams.toString()}`)
		setCurrentPage(newPage)
	}

	return {
		queryState,
		filtersState,
		currentPage,
		totalPages,
		handleQueryChange,
		handleFiltersChange,
		handlePageChange,
		paginatedFilteredPokemons,
	}
}
