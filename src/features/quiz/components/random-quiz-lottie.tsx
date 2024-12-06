'use client'

import Lottie from 'react-lottie-player'
import randomQuizData from '@/../../public/lottie/random/random.json'

const RandomQuizLottie = ({ className }: { className?: HTMLElement['className'] }) => {
  return (
    <Lottie
      animationData={randomQuizData}
      play
      speed={0.8}
      className={className}
      style={{
        width: 100,
        height: 85.6,
      }}
    />
  )
}

export default RandomQuizLottie
