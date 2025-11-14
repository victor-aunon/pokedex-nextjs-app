import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function chunk<t>(array: t[], chunksize: number): t[][] {
	if (!Array.isArray(array) || array.length === 0 || chunksize <= 0) {
		return []
	}

	const result: t[][] = []
	for (let i = 0; i < array.length; i += chunksize) {
		result.push(array.slice(i, i + chunksize))
	}
	return result
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number,
): T {
	let timeoutId: NodeJS.Timeout
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return ((...args: any[]) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}) as T
}
