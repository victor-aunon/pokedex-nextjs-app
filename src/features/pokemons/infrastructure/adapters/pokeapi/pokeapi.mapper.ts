import type {
	EvolutionChain,
	Pokemon,
	PokemonBase,
	PokemonItem,
} from '@/features/pokemons/domain/entities/pokemon'
import type { PokemonEvolutionChainResponseDTO } from './types/pokeapi-evolution-chain.types.ts'
import type { PokemonResponseDTO } from './types/pokeapi-pokemon.types.ts'

export function pokemonResponseToDomain(
	pokemon: PokemonResponseDTO,
): PokemonBase {
	const image =
		pokemon.sprites?.other?.['official-artwork']?.front_default ??
		pokemon.sprites?.other?.home?.front_default ??
		pokemon.sprites?.other?.dream_world?.front_default ??
		pokemon.sprites?.front_default

	return {
		id: pokemon.id,
		name: pokemon.name,
		image,
		types: pokemon.types.map(type => type.type.name),
		heightInCm: Math.round(pokemon.height * 10 * 100) / 100,
		weightInKg: Math.round((pokemon.weight / 10) * 100) / 100,
		sound: pokemon.cries?.latest ?? pokemon.cries?.legacy,
		species: pokemon.species.name,
		stats: {
			hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat ?? 0,
			attack:
				pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat ?? 0,
			defense:
				pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat ??
				0,
			specialAttack:
				pokemon.stats.find(stat => stat.stat.name === 'special-attack')
					?.base_stat ?? 0,
			specialDefense:
				pokemon.stats.find(stat => stat.stat.name === 'special-defense')
					?.base_stat ?? 0,
			speed:
				pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat ?? 0,
		},
	}
}

export function setEvolutionsToPokemons(pokemons: PokemonItem[]): Pokemon[] {
	return pokemons.map(pokemon => ({
		...pokemon,
		evolutions: pokemons.filter(
			p => p.evolutionChain === pokemon.evolutionChain,
		),
	}))
}

export function evolutionChainToDomain(
	chain: PokemonEvolutionChainResponseDTO['chain'],
): EvolutionChain {
	let evolutionNames: string[] = [chain.species.name]

	if (chain.evolves_to.length > 0) {
		const nextEvolutions = chain.evolves_to.flatMap(nextChain =>
			evolutionChainToDomain(nextChain),
		)
		evolutionNames = evolutionNames.concat(nextEvolutions)
	}

	return evolutionNames
}
