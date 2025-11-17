import { env } from '@/env'
import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { type Locale, i18n } from '@/i18n-config'
import { Suspense } from 'react'
import { HomePageView } from './HomePageView'

export async function generateStaticParams() {
	return i18n.locales.map(locale => ({ lang: locale }))
}

interface PageProps {
	params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: PageProps) {
	const { lang } = await params
	const pokemonsToFetch =
		env.NODE_ENV === 'development'
			? env.AMOUNT_OF_POKEMONS_TO_FETCH_IN_DEV
			: 3000

	const pokemons = await getPokemonsListUseCase({
		itemsPerPage: pokemonsToFetch,
		lang: lang as Locale,
	})

	return (
		<Suspense>
			<HomePageView
				pokemons={pokemons.results}
				itemsPerPage={env.DEFAULT_PAGINATION_LIMIT}
				lang={lang as Locale}
			/>
		</Suspense>
	)
}
