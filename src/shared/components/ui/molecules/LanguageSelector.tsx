'use client'

import { type Locale, i18n } from '@/i18n-config'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/atoms/Select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import '@/../node_modules/flag-icons/css/flag-icons.min.css'

const labels = {
	es: { name: 'Español', flag: 'fi-es' },
	en: { name: 'English', flag: 'fi-us' },
}

export function LanguageSelector() {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	const currentLocale =
		(pathname?.split('/')[1] as Locale) || i18n.defaultLocale

	const handleLanguageChange = (value: Locale) => {
		const newLocale = value

		if (newLocale === currentLocale) return

		const segments = pathname ? pathname.split('/') : []
		segments[1] = newLocale
		const newPath = segments.join('/')

		const queryString = searchParams.toString()
		const fullPath = queryString ? `${newPath}?${queryString}` : newPath

		router.push(fullPath)
	}

	return (
		<Select onValueChange={handleLanguageChange} value={currentLocale}>
			<SelectTrigger className="min-w-[110px] text-md">
				<SelectValue placeholder="" />
			</SelectTrigger>
			<SelectContent>
				{Object.values(['es', 'en']).map(lang => (
					<SelectItem key={lang} value={lang} className="text-md">
						<span>
							<span className={`fi ${labels[lang as Locale].flag}`} />{' '}
							{labels[lang as Locale].name}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
