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
import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useUpdateQuizResult } from '@/requests/quiz/hooks'
// import FixedBottom from '@/shared/components/custom/fixed-bottom'
// import { Button } from '@/shared/components/ui/button'
// import Icon from '@/shared/components/custom/icon'
// import Text from '@/shared/components/ui/text'
// import QuizCard from '../../components/quiz-card'
// import { msToElapsedTimeKorean } from '@/shared/utils/time'
import TodayQuizReward from '../today-quiz-reward'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import QuizResult from '../quiz-result'
import { todayQuizCheckList } from '../../config'

interface Props {
  quizzes: Quiz.Item[]
  isFirst: boolean | undefined
}

const QuizView = ({ quizzes, isFirst }: Props) => {
  const router = useRouter()
  const { id } = useParams()
  const redirectUrl = useSearchParams().get('redirectUrl')
  const quizSetType = useSearchParams().get('quizSetType')

  const { data: todayQuizInfo } = useQuery(queries.quiz.todayQuizInfo())
  const currentConsecutiveDays = todayQuizInfo?.currentConsecutiveDays ?? 0

  const todayCheckData = todayQuizCheckList.map((checkItem) => {
    if (checkItem.day <= currentConsecutiveDays) {
      return { ...checkItem, isComplete: true }
    }
    return { ...checkItem }
  })

  const { mutate: updateQuizResultMutate, isPending: isUpdatingQuizResult } = useUpdateQuizResult()
  const { currentIndex, navigateToNext } = useQuizNavigation()
  const {
    quizResults,
    showExplanation,
    totalElapsedTime,
    setQuizResults,
    handleNext,
    runTimer,
    stopTimer,
    isRunning,
  } = useQuizState({
    quizCount: quizzes.length,
    currentIndex,
  })

  const [showResult, setShowResult] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const [showTodayQuizReward, setShowTodayQuizReward] = useState(false)

  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  const currentQuiz = quizzes[currentIndex] ?? ({} as Quiz.Item)
  const currentResult = quizResults[currentIndex] ?? null

  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, quizzes.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
      stopTimer()

      const quizResultPayload = {
        quizSetId: id,
        quizzes: quizResults,
      } as Quiz.Request.UpdateQuizResult

      updateQuizResultMutate(quizResultPayload, {
        onSuccess: () => {
          setShowResult(true)
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

  const handleClickConfirm = () => {
    if (quizSetType === 'TODAY_QUIZ_SET') {
      setShowTodayQuizReward(true)
      setShowResult(false)
    }
    redirectUrl ? router.replace(redirectUrl) : router.replace('/')
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    runTimer()
  }, [runTimer])

  const collectQuizCount = quizResults.reduce((acc, cur) => acc + (cur?.answer ? 1 : 0), 0)

  if (showResult) {
    return (
      <QuizResult
        collectQuizCount={collectQuizCount}
        totalElapsedTime={totalElapsedTime}
        showRecord={showRecord}
        setShowRecord={setShowRecord}
        quizzes={quizzes}
        quizResults={quizResults}
        onClick={handleClickConfirm}
      />
    )
  }

  if (showTodayQuizReward) {
    return (
      <TodayQuizReward
        currentConsecutiveDays={currentConsecutiveDays}
        todayCheckData={todayCheckData}
      />
    )
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
            currentQuiz.quizType === 'MULTIPLE_CHOICE' && currentQuiz.options
              ? currentQuiz.options.find((option) => option === currentQuiz.answer)!
              : currentQuiz.answer === 'correct'
              ? 'O'
              : 'X'
          }
          explanation={currentQuiz.explanation}
          onClickNext={onNext}
          isPending={isUpdatingQuizResult}
        />
      )}

      {isQuizSolved(currentResult) && <ResultIcon isRight={currentResult?.answer} />}

      <ExitDialog
        index={currentIndex}
        open={exitDialogOpen}
        onOpenChange={setExitDialogOpen}
        isFirst={isFirst ?? false}
      />
    </div>
  )
}

export default QuizView
