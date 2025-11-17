import '@/styles/globals.css'
import { type Locale, i18n } from '@/i18n-config'
import { Footer, Header } from '@/shared/components/ui/molecules'
import { getDictionary } from '@/shared/lib/get-dictionary'
import { DictionaryProvider } from '@/shared/providers/DictionaryProvider'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

export async function generateStaticParams() {
	return i18n.locales.map(locale => ({ lang: locale }))
}

export async function generateMetadata({
	params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
	const { lang } = await params
	const dict = await getDictionary(lang as Locale)
	return {
		title: dict.meta.title,
		description: dict.meta.description,
	}
}

const sansation = Ubuntu({
	weight: ['300', '400', '700'],
	style: ['italic', 'normal'],
	subsets: ['latin'],
	variable: '--font-sansation',
})

export default async function RootLayout({
	children,
	params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
	const { lang } = await params
	const dict = await getDictionary(lang as Locale)

	return (
		<html lang={lang} className={`dark ${sansation.variable}`}>
			<body className="flex min-h-screen flex-col bg-background">
				<DictionaryProvider dictionary={dict}>
					<Header />
					<main className="container mx-auto max-w-screen-2xl flex-1 px-4 py-8">
						{children}
					</main>
					<Footer dict={dict.footer} />
				</DictionaryProvider>
			</body>
		</html>
	)
}
