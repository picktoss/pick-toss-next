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
import TodayQuizReward from '../today-quiz-reward'
import QuizResult from '../quiz-result'
import QuizSetFullAdView from '@/features/advertisement/screens/quiz-set-full-ad-view'
import useTodayQuizInfo from './hooks/use-today-quiz-info'
import { setTimeout } from 'timers'
import { SKIP_EXPLANATION_DRAWER_DELAY } from '../../config'

interface Props {
  quizzes: Quiz.Item[]
  isFirst: boolean | undefined
  exitRedirectUrl?: string
}

const QuizView = ({ quizzes, isFirst, exitRedirectUrl }: Props) => {
  const router = useRouter()
  const { id } = useParams()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  const quizSetType = searchParams.get('quizSetType')
  const documentId = searchParams.get('documentId') ?? '0'
  const hideTimer = searchParams.get('hideTimer') === 'true'
  const skipExplanation = searchParams.get('skipExplanation') === 'true'

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
    activeAutoNext,
  } = useQuizState({
    quizCount: quizzes.length,
    currentIndex,
    skipExplanation,
  })

  const {
    defaultReward,
    todayQuizInfo,
    setTodayQuizInfo,
    updatedConsecutiveDays,
    prevConsecutiveDays,
    todayCheckData,
  } = useTodayQuizInfo()

  const [showResult, setShowResult] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const [showTodayQuizReward, setShowTodayQuizReward] = useState(false)
  const [showAdvertisement, setShowAdvertisement] = useState(false)

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
        quizSetType,
        quizzes: quizResults.filter((result) => result != null), // 퀴즈 문제 보고 시 결과값에 담기지 않는 걸 필터링
      } as Quiz.Request.UpdateQuizResult

      updateQuizResultMutate(quizResultPayload, {
        onSuccess: (data) => {
          if (quizSetType === 'TODAY_QUIZ_SET') {
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

    setShowAdvertisement(true)
    setShowResult(false)
  }

  const handleClickReward = () => {
    setShowAdvertisement(true)
    setShowTodayQuizReward(false)
  }

  const handleCloseAd = () => {
    if (quizSetType === 'TODAY_QUIZ_SET') {
      router.replace(
        '/main?' + 'rewardType=TODAY_QUIZ' + `&reward=${todayQuizInfo?.reward ?? defaultReward}`
      )
      return
    }

    if (redirectUrl) {
      router.replace(redirectUrl)
      return
    }

    router.replace('/main')
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    runTimer()
  }, [runTimer])

  // 퀴즈 설정의 '문제 바로 넘기기'
  useEffect(() => {
    if (activeAutoNext) {
      setTimeout(() => onNext(), SKIP_EXPLANATION_DRAWER_DELAY)
    }
  }, [activeAutoNext])

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
        consecutiveDays={updatedConsecutiveDays}
        prevConsecutiveDays={prevConsecutiveDays}
        todayCheckData={todayCheckData}
        reward={todayQuizInfo?.reward ?? defaultReward}
        onClick={handleClickReward}
      />
    )
  }

  if (showAdvertisement) {
    return <QuizSetFullAdView onClose={handleCloseAd} />
  }

  return (
    <div className="fixed h-dvh max-h-[700px] w-full max-w-mobile">
      <QuizHeader
        hideTimer={hideTimer}
        isRunning={isRunning}
        totalElapsedTime={totalElapsedTime}
        runTimer={runTimer}
        stopTimer={stopTimer}
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
          <ReportQuizErrorDialog id={quizzes[currentIndex]?.id} onNext={onNext} />
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
