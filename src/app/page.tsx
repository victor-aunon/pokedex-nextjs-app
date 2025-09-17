import { getPokemonsListUseCase } from '@/features/pokemons/application/get-pokemons-list.usecase'
import { PokemonCard } from '@/features/pokemons/presentation/components'
import { CardGrid } from '@/shared/components/CardGrid'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { use } from 'react'

export default function HomePage() {
	// const pokemons = await getPokemonsListUseCase({ type: PokemonTypes.Fairy })
	// console.log(pokemons)
	const pokemons = use(getPokemonsListUseCase({ itemsPerPage: 10 }))

	return (
		<CardGrid>
			{pokemons.results.map(pokemon => (
				<PokemonCard
					key={pokemon.id}
					id={pokemon.id}
					types={pokemon.types}
					generation={pokemon.generation.toUpperCase()}
					avatarUrl={pokemon.image || ''}
					enableTilt={true}
					name={pokemon.name.toUpperCase()}
					grainUrl="https://reactbits.dev/assets/grain.webp"
					showBehindGradient={false}
				/>
			))}
		</CardGrid>
		// <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-display text-white">
		//   <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
		//     <h2 className="text-white tracking-tight">
		//       Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
		//     </h2>
		//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
		//       <Link
		//         className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
		//         href="https://create.t3.gg/en/usage/first-steps"
		//         target="_blank"
		//       >
		//         <h3 className="text-2xl">First Steps →</h3>
		//         <div className="text-lg">
		//           Just the basics - Everything you need to know to set up your
		//           database and authentication.
		//         </div>
		//       </Link>
		//       <Link
		//         className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
		//         href="https://create.t3.gg/en/introduction"
		//         target="_blank"
		//       >
		//         <h3 className="text-2xl">Documentation →</h3>
		//         <div className="text-lg">
		//           Learn more about Create T3 App, the libraries it uses, and how to
		//           deploy it.
		//         </div>
		//       </Link>
		//       <Button variant="default" className="rounded-lg">
		//         hello
		//       </Button>
		//     </div>
		//   </div>
		// </main>
	)
}
