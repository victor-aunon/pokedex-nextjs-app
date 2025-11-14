'use client'

import type { Pokemon } from '@/features/pokemons/domain/entities/pokemon'
import { PokemonTypes } from '@/features/pokemons/domain/enums/types.enum'
import { debounce } from '@/shared/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

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

	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1)
		}
	}, [currentPage, totalPages])

	const updateUrlWithoutNavigation = useCallback((params: URLSearchParams) => {
		const url = `${window.location.pathname}?${params.toString()}`
		window.history.replaceState({ ...window.history.state }, '', url)
	}, [])

	const debouncedUpdateUrl = useMemo(
		() =>
			debounce((params: URLSearchParams) => {
				updateUrlWithoutNavigation(params)
			}, 300),
		[updateUrlWithoutNavigation],
	)

	const handleQueryChange = useCallback(
		(newQuery: string) => {
			const currentParams = new URLSearchParams(searchParams.toString())

			if (!newQuery) currentParams.delete('query')
			else currentParams.set('query', newQuery)

			currentParams.delete('page')
			setCurrentPage(1)
			setQueryState(newQuery)

			debouncedUpdateUrl(currentParams)
		},
		[searchParams, debouncedUpdateUrl],
	)

	const handleFiltersChange = useCallback(
		(
			newFilters: Partial<{
				type: usePaginationProps['type'] | null
				generation: usePaginationProps['generation'] | null
			}>,
		) => {
			const currentParams = new URLSearchParams(searchParams.toString())

			const updatedFilters = { ...filtersState, ...newFilters }

			if (!updatedFilters.type) currentParams.delete('type')
			else currentParams.set('type', updatedFilters.type)

			if (!updatedFilters.generation) currentParams.delete('generation')
			else currentParams.set('generation', updatedFilters.generation)

			currentParams.delete('page')
			setCurrentPage(1)
			setFiltersState(updatedFilters)

			updateUrlWithoutNavigation(currentParams)
		},
		[searchParams, filtersState, updateUrlWithoutNavigation],
	)

	const handlePageChange = useCallback(
		(newPage: number) => {
			const currentParams = new URLSearchParams(searchParams.toString())

			if (newPage === 1) currentParams.delete('page')
			else currentParams.set('page', newPage.toString())

			updateUrlWithoutNavigation(currentParams)
			setCurrentPage(newPage)
		},
		[searchParams, updateUrlWithoutNavigation],
	)

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
