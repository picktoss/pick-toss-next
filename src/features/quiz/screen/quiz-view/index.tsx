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
import { useParams, useRouter } from 'next/navigation'
import { useUpdateQuizResult } from '@/requests/quiz/hooks'

interface Props {
  quizzes: Quiz.ItemWithMetadata[]
  isFirst: boolean | undefined
}

const QuizView = ({ quizzes, isFirst }: Props) => {
  const router = useRouter()
  const { id } = useParams()
  const { mutate: updateQuizResultMutate } = useUpdateQuizResult()
  const { currentIndex, navigateToNext } = useQuizNavigation()
  const { quizResults, showExplanation, totalElapsedTime, setQuizResults, handleNext, isRunning } =
    useQuizState({
      quizCount: quizzes.length,
      currentIndex,
    })

  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  const currentQuiz = quizzes[currentIndex] ?? ({} as Quiz.ItemWithMetadata)
  const currentResult = quizResults[currentIndex] ?? null

  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, quizzes.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      // TODO: 퀴즈 종료 처리 로직 추가
      const quizResultPayload = {
        quizSetId: id,
        quizzes: quizResults,
      } as Quiz.Request.UpdateQuizResult

      updateQuizResultMutate(quizResultPayload, {
        onSuccess: () => {
          // 퀴즈 결과 페이지로 이동
          router.replace('/') // 임시
        },
      })
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
    isRight,
    choseAnswer,
  }: {
    id: number
    isRight: boolean
    choseAnswer: string
  }) => {
    setQuizResults((prev) => {
      const newResults = [...prev]
      newResults[currentIndex] = {
        id,
        answer: isRight,
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

        <QuizOptions
          quiz={currentQuiz}
          currentResult={currentResult}
          onAnswer={onAnswer}
          className="mt-[40px]"
        />
      </div>

      {isFirst && (
        <div className="mt-[40px] px-[16px]">
          <ReportQuizErrorDialog />
        </div>
      )}

      {showExplanation && isQuizSolved(currentResult) && (
        <QuizExplanationDrawer
          isRight={currentResult.answer}
          rightAnswer={
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

      {isQuizSolved(currentResult) && <ResultIcon isRight={currentResult?.answer} />}

      <ExitDialog index={currentIndex} open={exitDialogOpen} onOpenChange={setExitDialogOpen} />
    </div>
  )
}

export default QuizView
