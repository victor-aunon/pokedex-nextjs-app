import '@/styles/globals.css'
import { Footer, Header } from '@/shared/components/ui/molecules'
import type { Metadata } from 'next'
import { Sansation } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Pokédex - Explora el Mundo Pokémon',
	description:
		'Descubre todos los Pokémon con nuestra Pokédex interactiva. Explora especies, tipos, generaciones y más información detallada.',
}

const sansation = Sansation({
	weight: ['300', '400', '700'],
	style: ['italic', 'normal'],
	subsets: ['latin'],
	variable: '--font-sansation',
})

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`dark ${sansation.variable}`}>
			<body className="flex min-h-screen flex-col bg-background">
				<Header />
				<main className="container mx-auto max-w-screen-2xl flex-1 px-4 py-8">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	)
}
