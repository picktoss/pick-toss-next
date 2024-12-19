'use client'

import Icon from '@/shared/components/custom/icon'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  leftQuizCount: number
  onNext: () => void
}

const BombAnimationSuccess = ({ leftQuizCount, onNext }: Props) => {
  const bombPositions = [
    { x: '-210px' },
    { x: '-145px' },
    { x: '-80px' },
    { x: '120px', targetX: '50%', condition: leftQuizCount >= 2 },
    { x: '200px', targetX: '120px', condition: leftQuizCount >= 3 },
    { x: '280px', targetX: '200px', condition: leftQuizCount > 3 },
  ]

  return (
    <div className="relative size-full overflow-x-hidden overflow-y-visible">
      {bombPositions.slice(0, 3).map((pos, index) => (
        <Bomb key={index} x={pos.x} />
      ))}

      {/* 점화 -> 폭탄 제거 */}
      <FlameBomb leftQuizCount={leftQuizCount} onNext={onNext} />

      {bombPositions.slice(3).map((pos, index) => {
        const actualIndex = index + 3

        return (
          pos.condition && (
            <MovingBomb
              key={actualIndex}
              initialX={pos.x}
              targetX={pos.targetX}
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
const Bomb = ({ x }: { x: string }) => (
  <motion.div className="center" initial={{ x, y: '50%', rotate: -90, opacity: 0.5 }}>
    <Icon name="bomb" />
  </motion.div>
)

/** 점화 후 폭탄 제거 애니메이션 */
const FlameBomb = ({ leftQuizCount, onNext }: { leftQuizCount: number; onNext: () => void }) => {
  const [isOnFire, setIsOnFire] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOnFire(true)
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
          duration: 0.7,
          delay: 0.5,
        }}
        onAnimationComplete={() => leftQuizCount === 1 && onNext()}
      >
        <AnimatedFlame />
        {isOnFire ? (
          <Icon name="bomb-red" className="center" />
        ) : (
          <Icon name="bomb" className="center" />
        )}
      </motion.div>
    </>
  )
}

/** 움직이는 폭탄 */
const MovingBomb = ({
  initialX,
  targetX,
  delay,
  onNext,
}: {
  initialX: string
  targetX: string
  delay: number
  onNext?: () => void
}) => (
  <motion.div
    className="center"
    initial={{ x: initialX, y: '50%' }}
    animate={{ x: targetX, y: '50%' }}
    transition={{
      duration: 0.5,
      delay,
      ease: 'easeOut',
    }}
    onAnimationComplete={onNext}
  >
    <Icon name="bomb" />
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
