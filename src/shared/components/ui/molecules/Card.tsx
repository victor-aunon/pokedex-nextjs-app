import { cn } from '@/shared/lib/utils'
import type { LucideProps } from 'lucide-react'

const Card = ({
	children,
	className,
	...rest
}: React.ComponentPropsWithRef<'section'>) => {
	return (
		<section
			className={cn('rounded-lg border border-border bg-card p-4', className)}
			{...rest}
		>
			{children}
		</section>
	)
}

interface CardTitleProps extends React.ComponentPropsWithRef<'h3'> {
	icon?: React.ComponentType<LucideProps>
	iconClassName?: string
}

const CardTitle = ({
	children,
	className,
	icon: Icon,
	iconClassName,
	...rest
}: CardTitleProps) => {
	return (
		<h3
			className={cn(
				'mb-2 flex items-center gap-1 text-body-md text-muted-foreground',
				className,
			)}
			{...rest}
		>
			{Icon && (
				<Icon
					className={cn(
						'inline-block h-6 w-6 text-card-foreground',
						iconClassName,
					)}
				/>
			)}
			{children}
		</h3>
	)
}

const CardTextContent = ({
	children,
	className,
	...rest
}: React.ComponentPropsWithRef<'p'>) => {
	return (
		<p
			className={cn('text-heading-md text-secondary-foreground', className)}
			{...rest}
		>
			{children}
		</p>
	)
}

Card.Title = CardTitle
Card.TextContent = CardTextContent

export { Card }
