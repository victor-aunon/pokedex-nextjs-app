'use client'

import { Button } from '@/shared/components/ui/atoms/Button'
import { Volume2, VolumeX } from 'lucide-react'
import { useRef, useState } from 'react'

interface PokemonSoundPlayerProps {
	sound: string | null
	pokemonName: string
}

export default function PokemonSoundPlayer({
	sound,
	pokemonName,
}: PokemonSoundPlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [hasError, setHasError] = useState(false)

	const playSound = async () => {
		if (!sound || hasError) return

		try {
			if (audioRef.current) {
				setIsPlaying(true)
				await audioRef.current.play()
			}
		} catch (error) {
			console.error('Error playing Pokemon sound:', error)
			setHasError(true)
			setIsPlaying(false)
		}
	}

	const handleAudioEnd = () => {
		setIsPlaying(false)
	}

	const handleAudioError = () => {
		setHasError(true)
		setIsPlaying(false)
	}

	// Si no hay sonido disponible, no renderizar nada
	if (!sound) {
		return null
	}

	return (
		<>
			<Button
				variant="secondary"
				size="sm"
				onClick={playSound}
				disabled={isPlaying || hasError}
				className="flex min-w-30 items-center gap-2 transition-all duration-200 hover:scale-105"
				title={`Play ${pokemonName} sound`}
			>
				{isPlaying ? (
					<Volume2 className="h-4 w-4 animate-pulse" />
				) : hasError ? (
					<VolumeX className="h-4 w-4 text-muted-foreground" />
				) : (
					<Volume2 className="h-4 w-4" />
				)}
				{isPlaying ? 'Playing...' : hasError ? 'Error' : 'Play Sound'}
			</Button>

			{/* Audio element oculto */}
			<audio
				ref={audioRef}
				preload="none"
				onEnded={handleAudioEnd}
				onError={handleAudioError}
				aria-label={`${pokemonName} sound`}
			>
				<source src={sound} type="audio/mpeg" />
				<source src={sound} type="audio/wav" />
				<source src={sound} type="audio/ogg" />
				<track kind="captions" srcLang="en" label="Pokemon sound" />
				Your browser does not support the audio element.
			</audio>
		</>
	)
}
