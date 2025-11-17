import type { Dictionary } from '@/shared/providers/DictionaryProvider'
import { ExternalLink, Github, Heart } from 'lucide-react'
import Link from 'next/link'

export function Footer({ dict }: { dict: Dictionary['footer'] }) {
	return (
		<footer className="border-t bg-card">
			<div className="container mx-auto max-w-screen-2xl px-4 py-8">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
					{/* Información del proyecto */}
					<div className="space-y-3">
						<h3 className="text-heading-md">Pokédex</h3>
						<p className="text-muted-foreground text-sm">{dict.description} </p>
					</div>

					{/* Recursos */}
					<div className="space-y-3">
						<h3 className="text-heading-md">{dict.resources}</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									href="https://pokeapi.co"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									PokéAPI
									<ExternalLink className="h-3 w-3" />
								</Link>
							</li>
							<li>
								<Link
									href="https://pokemon.com"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									Pokémon Official
									<ExternalLink className="h-3 w-3" />
								</Link>
							</li>
							<li>
								<Link
									href="https://nextjs.org"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									Next.js
									<ExternalLink className="h-3 w-3" />
								</Link>
							</li>
							<li>
								<Link
									href="https://reactbits.dev/components/profile-card"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									React Bits
									<ExternalLink className="h-3 w-3" />
								</Link>
							</li>
						</ul>
					</div>

					{/* Desarrollador */}
					<div className="space-y-3">
						<h3 className="text-heading-md">{dict.developer}</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="https://github.com/victor-aunon"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
								>
									<Github className="h-4 w-4" />
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Línea divisoria */}
				<div className="mt-8 mb-4 border-t pt-6">
					<p className="mx-auto flex w-fit items-center gap-1 text-muted-foreground text-sm">
						{dict.madeWith}
						<Heart className="h-4 w-4 fill-current text-primary" />
						{dict.andNextJS}
					</p>
				</div>

				{/* Disclaimer */}
				<p className="mx-auto w-fit w-max-[65ch] text-center text-muted-foreground text-xs">
					{dict.disclaimer}
				</p>
			</div>
		</footer>
	)
}
