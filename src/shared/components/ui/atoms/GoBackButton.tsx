'use client'

import Link from 'next/link'
import { Button } from './Button'

interface GoBackLinkProps {
	href?: string
	children?: React.ReactNode
}

export function GoBackButton({ href, children }: GoBackLinkProps) {
	if (href) {
		return (
			<Button variant="outline" size="lg" asChild className="w-fit">
				<Link href={href}>{children || 'Go Back'}</Link>
			</Button>
		)
	}

	return (
		<Button
			variant="outline"
			size="lg"
			onClick={() => window.history.back()}
			className="w-fit"
		>
			{children || 'Go Back'}
		</Button>
	)
}
