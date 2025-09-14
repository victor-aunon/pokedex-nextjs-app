export interface Pagination<T> {
	results: T[]
	currentPage: number
	totalPages: number
}
