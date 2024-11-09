import { UNTIL_EXPLANATION_DRAWER_OPEN } from '@/features/quiz/config'
import { isQuizSolved } from '@/features/quiz/utils'
import { useTimer } from '@/shared/hooks/use-timer'
import { useEffect, useState } from 'react'

interface UseQuizStateProps {
  quizCount: number
  currentIndex: number
}

export const useQuizState = ({ quizCount, currentIndex }: UseQuizStateProps) => {
  const [quizResults, setQuizResults] = useState<(Quiz.Result | null)[]>(() =>
    Array.from({ length: quizCount }, () => null)
  )
  const [showExplanation, setShowExplanation] = useState(false)
  const { totalElapsedTime, runTimer, stopTimer } = useTimer()

  const handleNext = (currentIndex: number, totalQuizzes: number) => {
    if (currentIndex < totalQuizzes - 1) {
      setShowExplanation(false)
      return true
    }
    return false
  }

  useEffect(() => {
    const currentResult = quizResults[currentIndex]

    if (isQuizSolved(currentResult)) {
      // 뒤로가기를 통해 이전 퀴즈로 돌아갔을 때 즉, 이미 푼 경우
      setTimeout(() => setShowExplanation(true), UNTIL_EXPLANATION_DRAWER_OPEN)
      stopTimer()
    } else {
      // 새로운 퀴즈인 경우
      setShowExplanation(false)
      runTimer()
    }
  }, [currentIndex, quizResults, runTimer, stopTimer])

  return {
    quizResults,
    setQuizResults,
    showExplanation,
    totalElapsedTime,
    handleNext,
    isRunning: !quizResults[currentIndex]?.choseAnswer,
  }
}
