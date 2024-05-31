import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'

interface Props {
  duration: number
}

export default function QuizFireworks({ duration }: Props) {
  return (
    <Fireworks
      onInit={async ({ confetti, conductor }) => {
        await confetti({
          particleCount: 200,
          ticks: duration,
          spread: 100,
          startVelocity: 50,
          origin: { x: 0.5, y: 0.7 },
          gravity: 2,
          zIndex: 100,
        })
        conductor.shoot()
      }}
    />
  )
}
