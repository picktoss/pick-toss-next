import { motion } from 'framer-motion'
import Icon from '@/shared/components/custom/icon'

interface Props {
  leftQuizCount: number
  setOpenExplanation?: (value: boolean) => void
}

const BombAnimationFail = ({ leftQuizCount, setOpenExplanation }: Props) => {
  const bombPositions = [
    // 이전 쌓여있는 폭탄들 (고정 이동)
    { x: '-210px', targetX: '-275px', rotate: -90, delay: 0.5 },
    { x: '-145px', targetX: '-210px', rotate: -90, delay: 0.5 },
    { x: '-80px', targetX: '-145px', rotate: -90, delay: 0.5 },
    // 회전 및 이동 폭탄
    { x: '50%', targetX: '-80px', rotate: -90, delay: 0.5, isAnimated: true },
    // 남은 폭탄
    { x: '120px', targetX: '50%', delay: 1, condition: leftQuizCount >= 2 },
    { x: '200px', targetX: '120px', delay: 1, condition: leftQuizCount >= 3 },
    { x: '280px', targetX: '200px', delay: 1, condition: leftQuizCount > 3 },
  ]

  return (
    <div className="relative size-full overflow-x-hidden overflow-y-visible">
      {/* 이전 폭탄 */}
      {bombPositions.slice(0, 3).map((bomb, index) => (
        <Bomb
          key={index}
          x={bomb.x}
          targetX={bomb.targetX}
          rotate={bomb.rotate ?? 0}
          delay={bomb.delay}
        />
      ))}

      {/* 회전 및 이동하는 폭탄 */}
      {bombPositions.slice(3, 4).map((bomb, index) => (
        <AnimatedBomb
          key={`animated-${index}`}
          x={bomb.x}
          targetX={bomb.targetX}
          rotate={bomb.rotate ?? 0}
          delay={bomb.delay}
          onAnimationComplete={() => {
            if (setOpenExplanation) setOpenExplanation(true)
          }}
        />
      ))}

      {/* 남은 폭탄 */}
      {bombPositions
        .slice(4)
        .map(
          (bomb, index) =>
            bomb.condition && (
              <Bomb
                key={`conditional-${index}`}
                x={bomb.x}
                targetX={bomb.targetX}
                rotate={bomb.rotate ?? 0}
                delay={bomb.delay}
              />
            )
        )}
    </div>
  )
}

export default BombAnimationFail

/** 기본 폭탄 컴포넌트 */
const Bomb = ({
  x,
  targetX,
  rotate,
  delay,
}: {
  x: string
  targetX: string
  rotate: number
  delay: number
}) => (
  <motion.div
    className="center"
    initial={{ x, y: '50%', rotate, opacity: 0.5 }}
    animate={{ x: targetX, y: '50%' }}
    transition={{
      duration: 0.5,
      delay,
      ease: 'easeInOut',
    }}
  >
    <Icon name="bomb" />
  </motion.div>
)

/** 회전 및 이동 폭탄 컴포넌트 */
const AnimatedBomb = ({
  x,
  targetX,
  rotate,
  delay,
  onAnimationComplete,
}: {
  x: string
  targetX: string
  rotate: number
  delay: number
  onAnimationComplete: () => void
}) => (
  <motion.div
    className="center"
    initial={{ x, y: '50%', opacity: 1, rotate: 0 }}
    animate={{ x: targetX, y: '50%', opacity: 0.5, rotate }}
    transition={{
      rotate: { duration: 0.5, ease: 'easeInOut' },
      default: { duration: 0.5, delay, ease: 'easeInOut' },
    }}
    onAnimationComplete={onAnimationComplete}
  >
    <Icon name="bomb" />
  </motion.div>
)
