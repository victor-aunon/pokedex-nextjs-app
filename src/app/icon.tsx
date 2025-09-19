import { Zap } from 'lucide-react'
import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
	width: 32,
	height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
	return new ImageResponse(
		// ImageResponse JSX element
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '9999px',
				backgroundColor: '#ffd500',
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
			</svg>
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		},
	)
}
