import type { Locale } from '@/i18n-config'
import { getDictionary } from '@/shared/lib/get-dictionary'
import { formatString } from '@/shared/lib/utils'
import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'
import { PokemonPageSkeleton } from './PokemonPageSkeleton'
import { PokemonPageView } from './PokemonPageView'

interface PageProps {
	params: Promise<{ lang: string; name: string }>
	searchParams: Promise<{ from_home?: string }>
}

export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const { name, lang } = await params
	const dict = await getDictionary(lang as Locale)

	return {
		title: formatString(dict.detail.meta.title, { name }),
		description: formatString(dict.detail.meta.description, { name }),
	}
}

export default async function PokemonPage({ params, searchParams }: PageProps) {
	const { lang, name } = await params
	const dict = await getDictionary(lang as Locale)

	const { from_home } = await searchParams

	return (
		<Suspense fallback={<PokemonPageSkeleton />}>
			<PokemonPageView
				name={name}
				fromHomeParams={from_home}
				dict={dict}
				lang={lang as Locale}
			/>
		</Suspense>
	)
}
