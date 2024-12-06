'use client'

import Lottie from 'react-lottie-player'
import bombQuizData from '@/../../public/lottie/bomb/bomb.json'

const BombQuizLottie = ({ className }: { className?: HTMLElement['className'] }) => {
  return (
    <Lottie
      animationData={bombQuizData}
      play
      speed={0.8}
      className={className}
      style={{
        width: 84.6,
        height: 83,
      }}
    />
  )
}

export default BombQuizLottie
