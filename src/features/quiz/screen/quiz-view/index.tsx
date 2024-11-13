'use client'

import QuizProgressBar from '../../components/quiz-progress-bar'
import ReportQuizErrorDialog from '../../components/report-quiz-error-dialog'
import QuizExplanationDrawer from '../../components/quiz-explanation-drawer'
import { useQuizNavigation } from './hooks/use-quiz-navigation'
import { useQuizState } from './hooks/use-quiz-state'
import QuizHeader from './components/quiz-header'
import QuizQuestion from './components/quiz-question'
import QuizOptions from './components/quiz-option'
import { isQuizSolved } from '../../utils'
import ResultIcon from '../../components/result-icon'
import ExitDialog from './components/exit-dialog'
import { useState } from 'react'

interface Props {
  quizzes: Quiz.ItemWithMetadata[]
}

const QuizView = ({ quizzes }: Props) => {
  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { quizResults, showExplanation, totalElapsedTime, setQuizResults, handleNext, isRunning } =
    useQuizState({
      quizCount: quizzes.length,
      currentIndex,
    })

  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  const currentQuiz = quizzes[currentIndex]
  const currentResult = quizResults[currentIndex]

  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, quizzes.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      // TODO: 퀴즈 종료 처리 로직 추가
    }
  }

  const calculateElapsedTime = () => {
    return (
      totalElapsedTime -
      quizResults
        .slice(0, currentIndex)
        .reduce((acc, result) => acc + (result?.elapsedTime || 0), 0)
    )
  }

  const onAnswer = ({
    id,
    isCorrect,
    choseAnswer,
  }: {
    id: number
    isCorrect: 'correct' | 'wrong'
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      const newResults = [...prev]
      newResults[currentIndex] = {
        id,
        answer: isCorrect,
        choseAnswer,
        elapsedTime: calculateElapsedTime(),
      }
      return newResults
    })
  }

  return (
    <div>
      <QuizHeader
        isRunning={isRunning}
        totalElapsedTime={totalElapsedTime}
        handleClickExit={() => setExitDialogOpen(true)}
      />

      <div className="px-[16px]">
        <QuizProgressBar totalQuizCount={quizzes.length} currentIndex={currentIndex} />
        <QuizQuestion index={currentIndex} question={currentQuiz.question} />

        <QuizOptions quiz={currentQuiz} currentResult={currentResult} onAnswer={onAnswer} />
      </div>

      <div className="mt-[40px] px-[16px]">
        <ReportQuizErrorDialog />
      </div>

      {showExplanation && isQuizSolved(currentResult) && (
        <QuizExplanationDrawer
          isCorrect={currentResult.answer === 'correct'}
          correctAnswer={
            currentQuiz.quizType === 'MULTIPLE_CHOICE'
              ? currentQuiz.options.find((option) => option === currentQuiz.answer)!
              : currentQuiz.answer === 'correct'
              ? 'O'
              : 'X'
          }
          explanation={currentQuiz.explanation}
          onClickNext={onNext}
        />
      )}

      {isQuizSolved(quizResults[currentIndex]) && (
        <ResultIcon isCorrect={quizResults[currentIndex]?.answer === 'correct'} />
      )}

      <ExitDialog index={currentIndex} open={exitDialogOpen} onOpenChange={setExitDialogOpen} />
    </div>
  )
}

export default QuizView
