import path from 'node:path'
import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./src/test/setup.ts'],
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		exclude: ['node_modules', 'dist', '.next'],
		coverage: {
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{js,ts,jsx,tsx}'],
			exclude: [
				'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
				'src/**/__tests__/**',
				'src/**/__mocks__/**',
				'src/test/**',
				'src/**/*.d.ts',
				'src/**/*.config.{js,ts}',
			],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
