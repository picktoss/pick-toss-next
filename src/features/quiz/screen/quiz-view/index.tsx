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
import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useUpdateQuizResult } from '@/requests/quiz/hooks'
import TodayQuizReward from '../today-quiz-reward'
import QuizResult from '../quiz-result'
import { todayQuizCheckList } from '../../config'

interface Props {
  quizzes: Quiz.Item[]
  isFirst: boolean | undefined
  exitRedirectUrl?: string
}

const QuizView = ({ quizzes, isFirst, exitRedirectUrl }: Props) => {
  const router = useRouter()
  const { id } = useParams()
  const redirectUrl = useSearchParams().get('redirectUrl')
  const quizSetType = useSearchParams().get('quizSetType')
  const documentId = useSearchParams().get('documentId') ?? '0'

  const { mutate: updateQuizResultMutate, isPending: isUpdatingQuizResult } = useUpdateQuizResult(
    Number(documentId)
  )
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
  const [todayQuizInfo, setTodayQuizInfo] = useState<{
    reward: number
    currentConsecutiveDays: number
  } | null>(null)
  const [showTodayQuizReward, setShowTodayQuizReward] = useState(false)

  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  const defaultReward = 5
  // 연속 5일 이후 오늘의 퀴즈 체크 화면 처리에 따라 변경될 수도 있음
  const prevConsecutiveDays = useMemo(
    () => ((todayQuizInfo?.currentConsecutiveDays ?? 1) % 5) - 1,
    [todayQuizInfo?.currentConsecutiveDays]
  )

  const todayCheckData = useMemo(
    () =>
      todayQuizCheckList.map((checkItem) => {
        if (checkItem.day <= prevConsecutiveDays) {
          return { ...checkItem, isComplete: true }
        }
        return { ...checkItem }
      }),
    [prevConsecutiveDays]
  )

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
        quizSetType,
        quizzes: quizResults,
      } as Quiz.Request.UpdateQuizResult

      updateQuizResultMutate(quizResultPayload, {
        onSuccess: (data) => {
          if (quizSetType === 'TODAY_QUIZ_SET') {
            // eslint-disable-next-line no-console
            console.log(
              'reward: ',
              data.reward,
              ' / currentConsecutiveDays: ',
              data.currentConsecutiveTodayQuizDate
            )

            setTodayQuizInfo({
              reward: data.reward,
              currentConsecutiveDays: data.currentConsecutiveTodayQuizDate,
            })
          }
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
      return
    }

    redirectUrl ? router.replace(redirectUrl) : router.replace('/')
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    runTimer()
  }, [runTimer])

  const correctQuizCount = quizResults.reduce((acc, cur) => acc + (cur?.answer ? 1 : 0), 0)

  if (showResult) {
    return (
      <QuizResult
        correctQuizCount={correctQuizCount}
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
        prevConsecutiveDays={prevConsecutiveDays}
        todayCheckData={todayCheckData}
        reward={todayQuizInfo?.reward ?? defaultReward}
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
        redirectUrl={exitRedirectUrl}
      />
    </div>
  )
}

export default QuizView
