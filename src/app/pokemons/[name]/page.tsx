import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'
import { PokemonPageSkeleton } from './PokemonPageSkeleton'
import { PokemonPageView } from './PokemonPageView'

interface PageProps {
	params: Promise<{ name: string }>
	searchParams: Promise<{ from_home?: string }>
}

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const name = (await params).name

	return {
		title: `Pokédex - ${name}`,
		description: `Detalles sobre ${name}`,
	}
}

export default async function PokemonPage({ params, searchParams }: PageProps) {
	const { name } = await params
	const { from_home } = await searchParams

	return (
		<Suspense fallback={<PokemonPageSkeleton />}>
			<PokemonPageView name={name} fromHomeParams={from_home} />
		</Suspense>
	)
}
