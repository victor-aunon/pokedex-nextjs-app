'use client'

import Link from 'next/link'
import { Button } from '../atoms/Button'

export function NotFoundNavigation() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Link href="/">
				<Button size="lg" className="font-bold">
					Return to Pokédex
				</Button>
			</Link>
			<Button
				variant="outline"
				size="lg"
				onClick={() => window.history.back()}
				className="w-fit"
			>
				Go Back
			</Button>
		</div>
	)
}
