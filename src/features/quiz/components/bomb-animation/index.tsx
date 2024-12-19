import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import BombAnimationSuccess from '../bomb-animation-success'
import BombAnimationFail from '../bomb-animation-fail'
import { motion } from 'framer-motion'
import Icon from '@/shared/components/custom/icon'

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
  const isSolvingQuiz = !currentResult

  // 문제 푸는 중
  if (isSolvingQuiz) {
    return <BombDefaultState leftQuizCount={leftQuizCount} />
  }

  // 결과 처리
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
        <Icon name="bomb" />
      </motion.div>
      <motion.div className="center" initial={{ x: '-145px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Icon name="bomb" />
      </motion.div>
      <motion.div className="center" initial={{ x: '-80px', y: '50%', rotate: -90, opacity: 0.5 }}>
        <Icon name="bomb" />
      </motion.div>

      <Icon name="bomb" className="center" />

      {leftQuizCount >= 2 && (
        <motion.div className="center" initial={{ x: '120px', y: '50%' }}>
          <Icon name="bomb" />
        </motion.div>
      )}

      {leftQuizCount >= 3 && (
        <motion.div className="center" initial={{ x: '200px', y: '50%' }}>
          <Icon name="bomb" />
        </motion.div>
      )}
    </div>
  )
}
