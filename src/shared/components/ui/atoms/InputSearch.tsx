import { cn } from '@/shared/lib/utils'
import { Search } from 'lucide-react'
import * as React from 'react'

function InputSearch({ className, ...props }: React.ComponentProps<'input'>) {
	return (
		<div className="relative w-full min-w-[200px] flex-12 lg:max-w-sm">
			<Search className="absolute left-1 h-6 w-6 translate-y-1/4 text-muted-foreground" />
			<input
				type="search"
				data-slot="input"
				className={cn(
					'h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 pl-9 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
					'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
					'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
					className,
				)}
				{...props}
			/>
		</div>
	)
}

export { InputSearch }
