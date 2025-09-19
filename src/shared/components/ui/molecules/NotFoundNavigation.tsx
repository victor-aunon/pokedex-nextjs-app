import Link from 'next/link'
import { Button } from '../atoms/Button'
import { GoBackButton } from '../atoms/GoBackButton'

export function NotFoundNavigation() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Link href="/">
				<Button size="lg" className="font-bold">
					Return to Pokédex
				</Button>
			</Link>
			<GoBackButton />
		</div>
	)
}
