'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/shared/components/ui/molecules/PaginationWithoutNavigation'
import { useMemo } from 'react'

interface PaginationProps extends React.ComponentProps<'nav'> {
	totalPages: number
	currentPage: number
	setCurrentPage: (value: number) => void
}

export function UIPagination({
	totalPages,
	currentPage,
	setCurrentPage,
	...props
}: PaginationProps) {
	const paginationSlices = useMemo(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const slices: any[] = [1, null, totalPages]
		if (totalPages === 2) return slices
		slices[1] = [-2, -1, 0, 1, 2]
			.map(i => currentPage + i)
			.filter(p => p > 1 && p < totalPages)

		return slices
	}, [totalPages, currentPage])

	return (
		<Pagination {...props} aria-label="Pagination Navigation">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className="text-lg"
						onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
						disabled={currentPage === 1}
					/>
				</PaginationItem>
				{/* First page */}
				<PaginationItem>
					<PaginationLink
						className="text-lg"
						isActive={currentPage === 1}
						onClick={() => setCurrentPage(1)}
					>
						1
					</PaginationLink>
				</PaginationItem>
				{/* Show ellipsis only if needed */}
				{paginationSlices[1]?.[0] - 1 > paginationSlices[0] && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{/* Show page numbers */}
				{paginationSlices[1]?.map((pageNum: number) => (
					<PaginationItem key={pageNum}>
						<PaginationLink
							className="text-lg"
							isActive={currentPage === pageNum}
							onClick={() => setCurrentPage(pageNum)}
						>
							{pageNum}
						</PaginationLink>
					</PaginationItem>
				))}
				{/* Show ellipsis only if needed */}
				{paginationSlices[1]?.at(-1) + 1 < paginationSlices[2] && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				{/* Last page */}
				{totalPages > 1 && (
					<PaginationItem>
						<PaginationLink
							className="text-lg"
							isActive={currentPage === totalPages}
							onClick={() => setCurrentPage(totalPages)}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationNext
						className="text-lg"
						onClick={() =>
							setCurrentPage(Math.min(currentPage + 1, totalPages))
						}
						disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
