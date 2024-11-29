import Image from 'next/image'
import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import BombAnimationSuccess from '../bomb-animation-success'
import BombAnimationFail from '../bomb-animation-fail'
import { motion } from 'framer-motion'

interface Props {
  currentIndex: number
  leftQuizCount: number
  quizResults: ReturnType<typeof useQuizState>['quizResults']
  onNext: () => void
  setOpenExplanation: (value: boolean) => void
}

const BombAnimation = ({
  currentIndex,
  leftQuizCount,
  quizResults,
  onNext,
  setOpenExplanation,
}: Props) => {
  const currentResult = quizResults[currentIndex]

  if (!currentResult) {
    return <BombDefaultState leftQuizCount={leftQuizCount} />
  }

  return (
    <>
      {currentResult.answer ? (
        <BombAnimationSuccess leftQuizCount={leftQuizCount} onNext={onNext} />
      ) : (
        <BombAnimationFail leftQuizCount={leftQuizCount} setOpenExplanation={setOpenExplanation} />
      )}
    </>
  )
}

export default BombAnimation

/** 문제를 푸는 중 보여줄 정지 상태 폭탄 컴포넌트 */
const BombDefaultState = ({ leftQuizCount }: { leftQuizCount: number }) => {
  return (
    <div className="relative h-[100px] w-full overflow-x-hidden overflow-y-visible">
      <motion.div className="center" initial={{ x: '-210px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
      </motion.div>
      <motion.div className="center" initial={{ x: '-145px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
      </motion.div>
      <motion.div className="center" initial={{ x: '-80px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
      </motion.div>

      <Image
        src={'/images/bomb-not-fire.png'}
        alt=""
        width={55}
        height={67.65}
        className="center"
      />

      {leftQuizCount >= 2 && (
        <motion.div className="center" initial={{ x: '120px', y: '50%' }}>
          <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
        </motion.div>
      )}

      {leftQuizCount >= 3 && (
        <motion.div className="center" initial={{ x: '200px', y: '50%' }}>
          <Image src={'/images/bomb-not-fire.png'} alt="" width={55} height={67.65} />
        </motion.div>
      )}
    </div>
  )
}
