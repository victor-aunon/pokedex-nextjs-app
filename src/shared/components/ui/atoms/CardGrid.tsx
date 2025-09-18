export function CardGrid({ children }: { children: React.ReactNode }) {
	return (
		<section className="grid w-full auto-rows-[420px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center justify-items-center md:gap-8">
			{children}
		</section>
	)
}
