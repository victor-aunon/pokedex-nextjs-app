import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

function getLocale(request: NextRequest): string | undefined {
	// Negociación de contenido para detectar idioma del navegador
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value
	})

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
	return matchLocale(languages, i18n.locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	// Ignorar archivos internos de next, imagenes, api, etc.
	if (
		[
			'/manifest.json',
			'/favicon.ico',
			'/icon',
			'/apple-icon',
			'/logo.png', // Añade aquí tus assets públicos
		].includes(pathname) ||
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') // Si tu API no necesita i18n por URL
	) {
		return
	}

	// Comprobar si la URL ya tiene el locale (ej: /en/...)
	const pathnameIsMissingLocale = i18n.locales.every(
		locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	)

	// Redirigir si falta el locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request)
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
				request.url,
			),
		)
	}
}

export const config = {
	// Matcher para interceptar todas las rutas excepto las excluidas
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|img|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
