'use client'

import Link from 'next/link'
import { Button } from './Button'

interface GoBackLinkProps {
	goBackText: string
	href?: string
	children?: React.ReactNode
}

export function GoBackButton({ goBackText, href, children }: GoBackLinkProps) {
	if (href) {
		return (
			<Button variant="outline" size="lg" asChild className="w-fit">
				<Link href={href}>{children || goBackText}</Link>
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
			{children || goBackText}
		</Button>
	)
}
