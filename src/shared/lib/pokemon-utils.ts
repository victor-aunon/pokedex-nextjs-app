export function getPokemonTypeColor(type: string): string {
	const typeColors: Record<string, string> = {
		normal: 'var(--color-pokemon-normal)',
		fighting: 'var(--color-pokemon-fighting)',
		flying: 'var(--color-pokemon-flying)',
		poison: 'var(--color-pokemon-poison)',
		ground: 'var(--color-pokemon-ground)',
		rock: 'var(--color-pokemon-rock)',
		bug: 'var(--color-pokemon-bug)',
		ghost: 'var(--color-pokemon-ghost)',
		steel: 'var(--color-pokemon-steel)',
		fire: 'var(--color-pokemon-fire)',
		water: 'var(--color-pokemon-water)',
		grass: 'var(--color-pokemon-grass)',
		electric: 'var(--color-pokemon-electric)',
		psychic: 'var(--color-pokemon-psychic)',
		ice: 'var(--color-pokemon-ice)',
		dragon: 'var(--color-pokemon-dragon)',
		dark: 'var(--color-pokemon-dark)',
		fairy: 'var(--color-pokemon-fairy)',
	}
	return typeColors[type.toLowerCase()] || 'var(--color-pokemon-normal)'
}
