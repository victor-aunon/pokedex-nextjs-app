import { Zap } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
			<div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
				{/* Logo y título */}
				<Link href="/" className="flex items-center space-x-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
						<Zap className="h-5 w-5 text-primary-foreground" />
					</div>
					<h1 className="text-heading-lg">Pokédex</h1>
				</Link>
				<Suspense>
					<LanguageSelector />
				</Suspense>
			</div>
		</header>
	)
}
