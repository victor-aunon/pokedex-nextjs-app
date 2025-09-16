import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
	if (!Array.isArray(array) || array.length === 0 || chunkSize <= 0) {
		return []
	}

	const result: T[][] = []
	for (let i = 0; i < array.length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize))
	}
	return result
}
