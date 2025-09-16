import { NextResponse } from 'next/server'

type ErrorContext = {
	resourceName: string
	resourceId?: string | number
	additionalContext?: Record<string, unknown>
}

export function handleApiError(
	error: unknown,
	context: ErrorContext,
): NextResponse {
	// Obtener información del contexto para errores más informativos
	const { resourceName, resourceId, additionalContext } = context
	const resource = resourceId ? `${resourceName} '${resourceId}'` : resourceName

	// Manejar tipos de error específicos
	if (error instanceof Error) {
		const { message } = error
		const errorMessage = message.toLowerCase()

		// Error de recurso no encontrado
		if (errorMessage.includes('not found') || errorMessage.includes('404')) {
			return NextResponse.json(
				{
					error: `${resource} not found`,
					details: message,
					...additionalContext,
				},
				{ status: 404 },
			)
		}

		// Error de petición errónea
		if (errorMessage.includes('bad request') || errorMessage.includes('400')) {
			return NextResponse.json(
				{
					error: `Bad Request ${resource}`,
					details: message,
					...additionalContext,
				},
				{ status: 400 },
			)
		}

		// Error genérico con la información que tenemos
		return NextResponse.json(
			{
				error: `Error processing ${resource.toLowerCase()}`,
				details: message,
				...additionalContext,
			},
			{ status: 500 },
		)
	}

	// Para errores que no son instancias de Error
	return NextResponse.json(
		{
			error: `Unknown error processing ${resource.toLowerCase()}`,
			...additionalContext,
		},
		{ status: 500 },
	)
}
