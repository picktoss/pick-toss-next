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
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import QuizCard from '../../components/quiz-card'

interface Props {
  quizzes: Quiz.Item[]
  isFirst: boolean | undefined
}

const QuizView = ({ quizzes, isFirst }: Props) => {
  const router = useRouter()
  const { id } = useParams()
  const redirectUrl = useSearchParams().get('redirectUrl')
  const { mutate: updateQuizResultMutate, isPending: isUpdatingQuizResult } = useUpdateQuizResult()
  const { currentIndex, navigateToNext } = useQuizNavigation()
  const {
    quizResults,
    showExplanation,
    totalElapsedTime,
    setQuizResults,
    handleNext,
    runTimer,
    isRunning,
  } = useQuizState({
    quizCount: quizzes.length,
    currentIndex,
  })

  const [showResult, setShowResult] = useState(false)
  const [showRecord, setShowRecord] = useState(false)

  const [exitDialogOpen, setExitDialogOpen] = useState(false)

  const currentQuiz = quizzes[currentIndex] ?? ({} as Quiz.Item)
  const currentResult = quizResults[currentIndex] ?? null

  const onNext = () => {
    const hasNextQuiz = handleNext(currentIndex, quizzes.length)
    if (hasNextQuiz) {
      navigateToNext(currentIndex)
    } else {
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    runTimer()
  }, [runTimer])

  const collectQuizCount = quizResults.reduce((acc, cur) => acc + (cur?.answer ? 1 : 0), 0)

  if (showResult) {
    return (
      <div className="min-h-dvh bg-background-base-02 px-4 pb-[100px]">
        <div className="translate-y-[15vh] pb-[140px]">
          <div className="relative w-full rounded-[20px] bg-white">
            <Icon name="complete-quiz" className="absolute right-1/2 top-[-58px] translate-x-1/2" />
            <div className="pt-[98px] text-center">
              <Text typography="subtitle1-bold">퀴즈 완료!</Text>
              <Text typography="hero" className="mt-1">
                <span className="text-text-info">{collectQuizCount}</span>/{quizzes.length}
              </Text>
            </div>

            <div className="flex justify-between px-[40px] pb-[29px] pt-[48px]">
              <div className="flex flex-col items-center">
                <div className="flex-center size-10">
                  <Icon name="speech-bubble-color" />
                </div>
                <Text typography="text2-medium" color="sub" className="mt-2">
                  문제 수
                </Text>
                <Text typography="subtitle2-bold" className="mt-0.5">
                  23 문제
                </Text>
              </div>

              <div className="h-[90px] w-px self-center bg-[#EAECEF]" />

              <div className="flex flex-col items-center">
                <div className="flex-center size-10">
                  <Icon name="timer-color" />
                </div>
                <Text typography="text2-medium" color="sub" className="mt-2">
                  소요시간
                </Text>
                <Text typography="subtitle2-bold" className="mt-0.5">
                  2분 30초
                </Text>
              </div>

              <div className="h-[90px] w-px self-center bg-[#EAECEF]" />

              <div className="flex flex-col items-center">
                <div className="flex-center size-10">
                  <Icon name="correct-check-round" />
                </div>
                <Text typography="text2-medium" color="sub" className="mt-2">
                  정답률
                </Text>
                <Text typography="subtitle2-bold" className="mt-0.5">
                  30%
                </Text>
              </div>
            </div>
          </div>

          {showRecord ? (
            <div className="mt-[49px]">
              <Text typography="title3">
                {quizzes.length}문제 중{' '}
                <span className="text-text-info">{collectQuizCount}문제</span> 맞았어요
              </Text>
              <div className="mt-5 flex flex-col gap-3">
                {quizzes.map((quiz, index) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    header={
                      <div className="flex items-center justify-between">
                        <Text typography="text1-bold">
                          {quizResults[index]?.answer ? (
                            <span className="text-text-success">정답</span>
                          ) : (
                            <span className="text-text-critical">오답</span>
                          )}
                        </Text>
                        <Text typography="text2-medium" color="caption">
                          전공 공부 {'>'} 최근 이슈
                        </Text>
                      </div>
                    }
                    userAnswer={quizResults[index]?.choseAnswer}
                    answerMode={true}
                    showExplanation={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Button
                variant="mediumSquare"
                colors="tertiary"
                className="mt-4 flex w-full items-center gap-2 text-button2"
                onClick={() => setShowRecord(true)}
              >
                <span>기록 보기</span>
                <Icon name="chevron-down" className="size-[16px] text-icon-tertiary" />
              </Button>
            </div>
          )}
        </div>

        <FixedBottom>
          <Button
            className="w-full"
            onClick={() => (redirectUrl ? router.replace(redirectUrl) : router.replace('/'))}
          >
            확인
          </Button>
        </FixedBottom>
      </div>
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

      <ExitDialog index={currentIndex} open={exitDialogOpen} onOpenChange={setExitDialogOpen} />
    </div>
  )
}

export default QuizView
