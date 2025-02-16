import { useQuizState } from '../../screen/quiz-view/hooks/use-quiz-state'
import BombAnimationSuccess from '../bomb-animation-success'
import BombAnimationFail from '../bomb-animation-fail'
import BombDefaultState from '../bomb-default-state'

interface Props {
  currentIndex: number
  leftQuizCount: number
  quizResults: ReturnType<typeof useQuizState>['quizResults']
  onNext: () => void
  setOpenExplanation?: (value: boolean) => void
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
