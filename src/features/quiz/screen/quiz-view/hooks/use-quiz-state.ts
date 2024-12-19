import { QUIZ_ANIMATION_DURATION, UNTIL_EXPLANATION_DRAWER_OPEN } from '@/features/quiz/config'
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
      setTimeout(() => runTimer(), QUIZ_ANIMATION_DURATION)
      return true
    }
    return false
  }

  useEffect(() => {
    const currentResult = quizResults[currentIndex] as Quiz.Result

    if (isQuizSolved(currentResult)) {
      setTimeout(() => setShowExplanation(true), UNTIL_EXPLANATION_DRAWER_OPEN)
      stopTimer()
    }
  }, [currentIndex, quizResults, runTimer, stopTimer])

  return {
    leftQuizCount: quizCount - currentIndex,
    quizResults,
    setQuizResults,
    showExplanation,
    totalElapsedTime,
    handleNext,
    runTimer,
    stopTimer,
    isRunning: !quizResults[currentIndex]?.choseAnswer,
  }
}
