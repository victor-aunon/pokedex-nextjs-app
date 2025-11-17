import type { Dictionary } from '@/shared/providers/DictionaryProvider'
import Link from 'next/link'
import { Button } from '../atoms/Button'
import { GoBackButton } from '../atoms/GoBackButton'

export function NotFoundNavigation({ dict }: { dict: Dictionary['notFound'] }) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Link href="/">
				<Button size="lg" className="font-bold">
					{dict.return}
				</Button>
			</Link>
			<GoBackButton goBackText={dict.goBack} />
		</div>
	)
}
