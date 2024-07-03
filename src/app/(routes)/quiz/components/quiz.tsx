'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import QuizIntro from './quiz-intro'
import { useEffect, useState } from 'react'
import QuizHeader from './quiz-header'
import Explanation from './explanation'
import Question from './question'
import { delay } from '@/utils/delay'
import MultipleOptions from './multiple-options'
import MixUpOptions from './mix-up-options'
import { QuizProgress, SolvingData } from '../types'
import { INTRO_DURATION, SHOW_RESULT_DURATION } from '../constants'
import { SwitchCase } from '@/components/react/switch-case'
import { useTimer } from '../hooks/use-timer'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import QuizResult from './quiz-result'
import { ChoiceReact } from './choice-react'
import { ReportQuizError } from './report-quiz-error'
import { deleteQuiz } from '@/apis/fetchers/quiz/delete-quiz/fetcher'
import { cn } from '@/lib/utils'
import { usePatchQuizResultMutation } from '@/apis/fetchers/quiz/patch-quiz-result/mutation'

interface QuizProps {
  quizzes: QuizDTO[]
  isTodayQuiz: boolean
}

export default function Quiz({ quizzes, isTodayQuiz }: QuizProps) {
  const quizSetId = useSearchParams().get('quizSetId') || ''
  const session = useSession()

  const [state, setState] = useState<'intro' | 'solving' | 'end'>('intro')
  const { totalElapsedTime, runTimer, stopTimer } = useTimer()
  const [solvingData, setSolvingData] = useState<SolvingData>([])
  const [isLoadingResult, setIsLoadingResult] = useState(false)

  const [reward, setReward] = useState<null | number>(null)

  const { mutate: patchQuizResultMutate } = usePatchQuizResultMutation()

  const { mutate: deleteQuizMutate } = useMutation({
    mutationKey: ['deleteQuiz'],
    mutationFn: ({
      documentId,
      quizSetId,
      quizId,
    }: {
      documentId: number
      quizSetId: string
      quizId: number
    }) =>
      deleteQuiz({
        documentId,
        quizSetId,
        quizId,
        accessToken: session.data?.user.accessToken || '',
      }),
  })

  const [quizProgress, setQuizProgress] = useState<QuizProgress>({
    quizIndex: 0,
    selectedMultipleQuizAnswer: null,
    selectedMixUpQuizAnswer: null,
    progress: 'idle',
  })

  const curQuiz = quizzes[quizProgress.quizIndex]
  const isCorrect =
    curQuiz.quizType === 'MULTIPLE_CHOICE'
      ? curQuiz.options[quizProgress.selectedMultipleQuizAnswer!] === curQuiz.answer
      : quizProgress.selectedMixUpQuizAnswer === curQuiz.answer

  const onSelectAnswer = async (answer: number | 'correct' | 'incorrect') => {
    stopTimer()

    if (typeof answer === 'number') {
      setQuizProgress((prev) => ({
        ...prev,
        progress: 'choose',
        selectedMultipleQuizAnswer: answer,
      }))
    } else {
      setQuizProgress((prev) => ({
        ...prev,
        progress: 'choose',
        selectedMixUpQuizAnswer: answer,
      }))
    }

    await delay(SHOW_RESULT_DURATION)

    setQuizProgress((prev) => ({
      ...prev,
      progress: 'result',
    }))
  }

  const next = () => {
    const newSolvingData = [
      ...solvingData,
      {
        id: curQuiz.id,
        answer: isCorrect,
        elapsedTime: totalElapsedTime,
      },
    ]
    setSolvingData(newSolvingData)

    if (quizProgress.quizIndex === quizzes.length - 1) {
      setIsLoadingResult(true)
      patchQuizResultMutate(
        { quizSetId, solvingData: newSolvingData },
        {
          onSuccess: ({ reward }) => {
            setReward(reward)
            setState('end')
          },
        }
      )
      return
    }

    setQuizProgress((prev) => ({
      quizIndex: prev.quizIndex + 1,
      selectedMultipleQuizAnswer: null,
      selectedMixUpQuizAnswer: null,
      progress: 'idle',
    }))
  }

  const handlePassQuiz = () => {
    stopTimer()

    deleteQuizMutate(
      {
        documentId: curQuiz.document.id,
        quizSetId,
        quizId: curQuiz.id,
      },
      {
        onSettled: () => {
          if (quizProgress.quizIndex === quizzes.length - 1) {
            setIsLoadingResult(true)
            patchQuizResultMutate(
              { quizSetId, solvingData },
              {
                onSuccess: () => {
                  setState('end')
                },
              }
            )
            return
          }

          setQuizProgress((prev) => ({
            ...prev,
            quizIndex: prev.quizIndex + 1,
          }))
        },
      }
    )
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setState('solving')
    }, INTRO_DURATION)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <SwitchCase
      value={state}
      caseBy={{
        intro: <QuizIntro quizzes={quizzes} className="mx-[20px] mt-[43px]" />,
        solving: (
          <>
            <div className="pt-[12px]">
              <QuizHeader
                className="mb-[32px] px-[20px] lg:mb-[36px]"
                totalElapsedTime={totalElapsedTime}
              />

              <Question
                categoryName={curQuiz.category.name}
                documentName={curQuiz.document.name}
                question={curQuiz.question}
                curQuizIndex={quizProgress.quizIndex}
                totalQuizCount={quizzes.length}
                totalElapsedTime={totalElapsedTime}
                isTodayQuiz={isTodayQuiz}
                quizType={curQuiz.quizType}
              />
              <div
                className={cn(
                  'lg:mx-[20px] lg:rounded-b-[12px] lg:bg-white',
                  curQuiz.quizType === 'MIX_UP' ? 'lg:pb-[81.8px]' : 'lg:pb-[40px]'
                )}
              >
                <div className="lg:mx-auto lg:w-[640px]">
                  <SwitchCase
                    value={curQuiz.quizType}
                    caseBy={{
                      MULTIPLE_CHOICE: (
                        <MultipleOptions
                          quizProgress={quizProgress}
                          curQuiz={curQuiz}
                          onSelectAnswer={onSelectAnswer}
                          onVisibleAnimationEnd={() => runTimer()}
                          className="pt-[24px] lg:pt-[40px]"
                        />
                      ),
                      MIX_UP: (
                        <MixUpOptions
                          quizProgress={quizProgress}
                          curQuiz={curQuiz}
                          onSelectAnswer={onSelectAnswer}
                          onVisibleAnimationEnd={() => runTimer()}
                          className="pt-[40px] lg:pt-[58px]"
                        />
                      ),
                    }}
                  />
                  {quizProgress.progress === 'idle' ? (
                    <div className="ml-[20px] mt-[25px] pb-[40px] lg:ml-0 lg:mt-[40px] lg:p-0">
                      <ReportQuizError handlePassQuiz={handlePassQuiz} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {quizProgress.progress === 'result' ? (
              <Explanation
                isCorrect={isCorrect}
                correctItem={
                  curQuiz.quizType === 'MULTIPLE_CHOICE'
                    ? String.fromCharCode(
                        65 + curQuiz.options.findIndex((option) => curQuiz.answer === option)
                      )
                    : curQuiz.answer === 'correct'
                    ? 'O'
                    : 'X'
                }
                explanation={curQuiz.explanation}
                next={next}
                className="mt-[48px] lg:mx-[20px] lg:mt-0"
                isLoadingResult={isLoadingResult}
              />
            ) : null}

            <ChoiceReact
              duration={SHOW_RESULT_DURATION}
              isCorrect={isCorrect}
              condition={quizProgress.progress === 'choose'}
            />
          </>
        ),
        end: (
          <QuizResult
            totalElapsedTime={totalElapsedTime}
            isTodayQuiz={isTodayQuiz}
            reward={reward}
            results={solvingData.map((data) => ({
              ...data,
              category: quizzes.find((quiz) => quiz.id === data.id)!.category,
            }))}
          />
        ),
      }}
    />
  )
}
