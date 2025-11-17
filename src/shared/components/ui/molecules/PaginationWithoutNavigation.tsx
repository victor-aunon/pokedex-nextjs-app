import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/shared/components/ui/atoms/Button'
import { cn } from '@/shared/lib/utils'
import type { Dictionary } from '@/shared/providers/DictionaryProvider'

interface PaginationProps extends React.ComponentProps<'nav'> {
	dict: Dictionary['pagination']
}

function Pagination({ className, dict, ...props }: PaginationProps) {
	return (
		<nav
			aria-label={dict.label}
			data-slot="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
	React.ComponentProps<'button'>

function PaginationLink({
	isActive,
	size = 'icon',
	children,
	...props
}: PaginationLinkProps) {
	return (
		<Button
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			variant={isActive ? 'outline' : 'ghost'}
			data-active={isActive}
			size={size}
			{...props}
		>
			{children}
		</Button>
	)
}

interface PaginationButtonProps
	extends React.ComponentProps<typeof PaginationLink> {
	dict: Dictionary['pagination']
}

function PaginationPrevious({
	className,
	dict,
	...props
}: PaginationButtonProps) {
	return (
		<PaginationLink
			aria-label={dict.goPrevious}
			size="default"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}
		>
			<ChevronLeftIcon />
			<span className="hidden sm:block">{dict.previous}</span>
		</PaginationLink>
	)
}

function PaginationNext({ className, dict, ...props }: PaginationButtonProps) {
	return (
		<PaginationLink
			aria-label={dict.goNext}
			size="default"
			className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
			{...props}
		>
			<span className="hidden sm:block">{dict.next}</span>
			<ChevronRightIcon />
		</PaginationLink>
	)
}

interface PaginationEllipsisProps extends React.ComponentProps<'span'> {
	dict: Dictionary['pagination']
}

function PaginationEllipsis({
	className,
	dict,
	...props
}: PaginationEllipsisProps) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">{dict.morePages}</span>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
}
