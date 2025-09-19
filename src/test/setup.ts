import '@testing-library/jest-dom'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { handlers } from './mocks/handlers'

// Setup MSW server
export const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Close server after all tests
afterAll(() => server.close())

// Mock environment variables for T3 env
vi.mock('@/env', () => ({
	env: {
		NODE_ENV: 'test',
		DEFAULT_PAGINATION_LIMIT: 20,
		AMOUNT_OF_POKEMONS_TO_FETCH_IN_DEV: 60,
	},
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
	}),
	useSearchParams: () => ({
		get: vi.fn(),
		toString: () => '',
	}),
	usePathname: () => '/test-path',
	notFound: vi.fn(),
}))
