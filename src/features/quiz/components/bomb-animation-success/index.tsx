'use client'

import Icon from '@/shared/components/custom/icon'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  leftQuizCount: number
  onNext: () => void
}

const BombAnimationSuccess = ({ leftQuizCount, onNext }: Props) => {
  const bombPositions = [
    { x: '-210px', y: '50%' },
    { x: '-145px', y: '50%' },
    { x: '-80px', y: '50%' },
    { x: '120px', y: '50%' },
    { x: '200px', y: '50%' },
    { x: '280px', y: '50%' },
  ]

  return (
    <div className="relative size-full overflow-x-hidden overflow-y-visible">
      {bombPositions.slice(0, 3).map((pos, index) => (
        <Bomb key={index} x={pos.x} y={pos.y} />
      ))}

      {/* 점화 -> 폭탄 제거 */}
      <FlameBomb leftQuizCount={leftQuizCount} onNext={onNext} />

      {bombPositions.slice(3).map((pos, index) => {
        const prevIndex = index + 2
        const actualIndex = index + 3
        const shouldRender =
          (actualIndex === 3 && leftQuizCount >= 2) ||
          (actualIndex === 4 && leftQuizCount >= 3) ||
          (actualIndex === 5 && leftQuizCount > 3)

        return (
          shouldRender && (
            <MovingBomb
              key={actualIndex}
              initialX={pos.x}
              targetX={index === 0 ? '50%' : bombPositions[prevIndex].x}
              y={pos.y}
              delay={1}
              onNext={index === 0 ? onNext : undefined}
            />
          )
        )
      })}
    </div>
  )
}

export default BombAnimationSuccess

/** 이전에 쌓여있는 폭탄 컴포넌트 */
const Bomb = ({ x, y }: { x: string; y: string }) => (
  <motion.div className="center" initial={{ x, y, rotate: -90, opacity: 0.5 }}>
    <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
  </motion.div>
)

/** 점화 후 폭탄 제거 애니메이션 */
const FlameBomb = ({ leftQuizCount, onNext }: { leftQuizCount: number; onNext: () => void }) => {
  const [bombSrc, setBombSrc] = useState('/images/bomb-not-fire.png')

  useEffect(() => {
    const timer = setTimeout(() => {
      setBombSrc('/images/bomb-fire.png')
    }, 350)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <motion.div
        className="relative size-full"
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0, 1, 0, 0],
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        onAnimationComplete={() => leftQuizCount === 1 && onNext()}
      >
        <AnimatedFlame />
        <Image src={bombSrc} alt="" width={55} height={67.65} className="center" />
      </motion.div>
    </>
  )
}

/** 움직이는 폭탄 */
const MovingBomb = ({
  initialX,
  targetX,
  y,
  delay,
  onNext,
}: {
  initialX: string
  targetX: string
  y: string
  delay: number
  onNext?: () => void
}) => (
  <motion.div
    className="center"
    initial={{ x: initialX, y }}
    animate={{ x: targetX, y }}
    transition={{
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }}
    onAnimationComplete={onNext}
  >
    <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
  </motion.div>
)

/** AnimatedFlame 컴포넌트 */
const AnimatedFlame = () => (
  <motion.div
    className="absolute bottom-1/2 right-1/2 z-50"
    initial={{ x: '30px', y: '-150%', opacity: 0 }}
    animate={{ x: '30px', y: '-55%', opacity: 1 }}
    transition={{
      duration: 0.5,
      ease: 'easeOut',
    }}
  >
    <Icon name="today-quiz" className="size-[47px]" />
  </motion.div>
)
