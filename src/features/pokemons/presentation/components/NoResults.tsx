import { Button } from '@/shared/components/ui/atoms/Button'
import { Search, X } from 'lucide-react'

interface NoResultsProps {
	query?: string
	hasActiveFilters?: boolean
	onClearFilters?: () => void
}

export default function NoResults({
	query,
	hasActiveFilters = false,
	onClearFilters,
}: NoResultsProps) {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-16 text-center">
			<div className="relative mb-8">
				<div className="font-mono text-6xl text-orange-400 leading-none md:text-8xl">
					🐟
				</div>
				<div
					className="absolute animate-bounce text-2xl"
					style={{ top: '-0.5rem', right: '-0.5rem' }}
				>
					💧
				</div>
			</div>

			{/* Main Message */}
			<div className="mb-6 max-w-md">
				<h2 className="mb-4 text-foreground text-heading-lg">
					No Pokémon Found
				</h2>

				{query && (
					<p className="mb-2 text-body-md text-muted-foreground">
						No results found for{' '}
						<span className="font-medium text-foreground">"{query}"</span>
					</p>
				)}

				<p className="text-body-md text-muted-foreground">
					{hasActiveFilters
						? "Your current filters didn't match any Pokémon. Try adjusting your search criteria."
						: "Even Magikarp couldn't find what you're looking for! Try a different search term."}
				</p>
			</div>

			{/* Action Buttons */}
			<div className="flex flex-col items-center gap-3 sm:flex-row">
				{hasActiveFilters && onClearFilters && (
					<Button variant="default" size="lg" onClick={onClearFilters}>
						<X className="h-4 w-4" />
						Clear filters
					</Button>
				)}

				<div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-card-foreground">
					<Search className="h-4 w-4 text-muted-foreground" />
					<span className="text-body-md">
						Try searching for "Pikachu" or "Blastoise"
					</span>
				</div>
			</div>

			{/* Decorative elements */}
			<div className="mt-8 flex gap-4 text-2xl opacity-30">
				<span>🌊</span>
				<span>🐠</span>
				<span>💦</span>
				<span>🌊</span>
			</div>
		</div>
	)
}
