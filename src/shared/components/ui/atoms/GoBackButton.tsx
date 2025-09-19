'use client'

import { Button } from './Button'

export function GoBackButton({ children }: { children?: React.ReactNode }) {
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
