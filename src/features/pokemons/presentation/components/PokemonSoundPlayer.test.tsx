import PokemonSoundPlayer from '@/features/pokemons/presentation/components/PokemonSoundPlayer'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
	Volume2: ({ className }: { className?: string }) => (
		<div data-testid="volume2-icon" className={className} />
	),
	VolumeX: ({ className }: { className?: string }) => (
		<div data-testid="volumex-icon" className={className} />
	),
}))

// Mock Button component
vi.mock('@/shared/components/ui/atoms/Button', () => ({
	Button: ({
		children,
		onClick,
		disabled,
		className,
		title,
		...props
	}: {
		children: React.ReactNode
		onClick?: () => void
		disabled?: boolean
		className?: string
		title?: string
		[key: string]: unknown
	}) => (
		<button
			onClick={onClick}
			disabled={disabled}
			className={className}
			title={title}
			data-testid="play-button"
			{...props}
		>
			{children}
		</button>
	),
}))

// Mock HTMLAudioElement
const mockPlay = vi.fn()
const mockPause = vi.fn()

beforeEach(() => {
	mockPlay.mockClear()
	mockPause.mockClear()

	// Mock HTMLAudioElement
	global.HTMLAudioElement.prototype.play = mockPlay
	global.HTMLAudioElement.prototype.pause = mockPause
	global.HTMLAudioElement.prototype.load = vi.fn()
})

describe('PokemonSoundPlayer', () => {
	const defaultProps = {
		sound: 'https://example.com/pikachu.wav',
		pokemonName: 'pikachu',
	}

	it('should render play button when sound is available', () => {
		render(<PokemonSoundPlayer {...defaultProps} />)

		expect(screen.getByTestId('play-button')).toBeInTheDocument()
		expect(screen.getByText('Play Sound')).toBeInTheDocument()
		expect(screen.getByTestId('volume2-icon')).toBeInTheDocument()
	})

	it('should not render anything when sound is null', () => {
		const { container } = render(
			<PokemonSoundPlayer sound={null} pokemonName="pikachu" />,
		)

		expect(container.firstChild).toBeNull()
	})

	it('should not render anything when sound is empty string', () => {
		const { container } = render(
			<PokemonSoundPlayer sound="" pokemonName="pikachu" />,
		)

		expect(container.firstChild).toBeNull()
	})

	it('should have correct button attributes', () => {
		render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		expect(button).toHaveAttribute('title', 'Play pikachu sound')
		expect(button).not.toBeDisabled()
	})

	it('should render audio element with correct attributes', () => {
		render(<PokemonSoundPlayer {...defaultProps} />)

		const audio = screen.getByLabelText('pikachu sound')
		expect(audio).toBeInTheDocument()
		expect(audio).toHaveAttribute('preload', 'none')
	})

	it('should render multiple audio source formats', () => {
		const { container } = render(<PokemonSoundPlayer {...defaultProps} />)

		const sources = container.querySelectorAll('source')
		expect(sources).toHaveLength(3)

		expect(sources[0]).toHaveAttribute('type', 'audio/mpeg')
		expect(sources[1]).toHaveAttribute('type', 'audio/wav')
		expect(sources[2]).toHaveAttribute('type', 'audio/ogg')

		sources.forEach(source => {
			expect(source).toHaveAttribute('src', defaultProps.sound)
		})
	})

	it('should call play when button is clicked', async () => {
		mockPlay.mockResolvedValue(undefined)

		render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		await waitFor(() => {
			expect(mockPlay).toHaveBeenCalledTimes(1)
		})
	})

	it('should show playing state when audio is playing', async () => {
		mockPlay.mockResolvedValue(undefined)

		render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		await waitFor(() => {
			expect(screen.getByText('Playing...')).toBeInTheDocument()
			expect(button).toBeDisabled()
		})

		const volumeIcon = screen.getByTestId('volume2-icon')
		expect(volumeIcon).toHaveClass('animate-pulse')
	})

	it('should handle audio end event', async () => {
		mockPlay.mockResolvedValue(undefined)

		const { container } = render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		await waitFor(() => {
			expect(screen.getByText('Playing...')).toBeInTheDocument()
		})

		// Simulate audio ending
		const audio = container.querySelector('audio')
		if (audio) {
			fireEvent.ended(audio)
		}

		await waitFor(() => {
			expect(screen.getByText('Play Sound')).toBeInTheDocument()
			expect(button).not.toBeDisabled()
		})
	})

	it('should handle audio error', async () => {
		const { container } = render(<PokemonSoundPlayer {...defaultProps} />)

		const audio = container.querySelector('audio')
		if (audio) {
			fireEvent.error(audio)
		}

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument()
			expect(screen.getByTestId('volumex-icon')).toBeInTheDocument()
		})

		const button = screen.getByTestId('play-button')
		expect(button).toBeDisabled()
	})

	it('should handle play error', async () => {
		mockPlay.mockRejectedValue(new Error('Playback failed'))

		// Spy on console.error to verify error logging
		const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

		render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith(
				'Error playing Pokemon sound:',
				expect.any(Error),
			)
		})

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument()
		})

		expect(button).toBeDisabled()

		consoleSpy.mockRestore()
	})

	it('should not play when already playing', async () => {
		mockPlay.mockResolvedValue(undefined)

		render(<PokemonSoundPlayer {...defaultProps} />)

		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		await waitFor(() => {
			expect(screen.getByText('Playing...')).toBeInTheDocument()
		})

		// Try to click again while playing
		fireEvent.click(button)

		// Should still only be called once
		expect(mockPlay).toHaveBeenCalledTimes(1)
	})

	it('should not play when there is an error', async () => {
		const { container } = render(<PokemonSoundPlayer {...defaultProps} />)

		// Trigger error first
		const audio = container.querySelector('audio')
		if (audio) {
			fireEvent.error(audio)
		}

		await waitFor(() => {
			expect(screen.getByText('Error')).toBeInTheDocument()
		})

		// Try to click button after error
		const button = screen.getByTestId('play-button')
		fireEvent.click(button)

		// Play should not be called
		expect(mockPlay).not.toHaveBeenCalled()
	})

	it('should handle different Pokemon names', () => {
		render(
			<PokemonSoundPlayer
				sound="https://example.com/charizard.wav"
				pokemonName="charizard"
			/>,
		)

		const button = screen.getByTestId('play-button')
		expect(button).toHaveAttribute('title', 'Play charizard sound')

		const audio = screen.getByLabelText('charizard sound')
		expect(audio).toBeInTheDocument()
	})
})
