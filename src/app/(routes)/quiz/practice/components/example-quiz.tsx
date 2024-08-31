'use client'

import { QuizType } from '@/apis/types/dto/quiz.dto'
import { useEffect, useState } from 'react'
import { useTimer } from '../../hooks/use-timer'
import { QuizProgress, SolvingData } from '../../types'
import { delay } from '@/utils/delay'
import { INTRO_DURATION, SHOW_RESULT_DURATION } from '../../constants'
import { SwitchCase } from '@/shared/components/react/switch-case'
import { cn } from '@/shared/lib/utils'
import { ChoiceReact } from '../../components/choice-react'
import Explanation from '../../components/explanation'
import ExampleQuizIntro from './example-quiz-intro'
import ExampleQuizHeader from './example-quiz-header'
import ExampleQuizResult from './example-quiz-result'
import ExampleQuestion from './example-question'
import type { ExampleQuizType } from '@/apis/fetchers/quiz/get-example-quizzes/fetcher'
import ExampleMultipleOptions from './example-multiple-options'
import ExampleMixUpOptions from './example-mix-up-options'
import useAmplitudeContext from '@/shared/hooks/use-amplitude-context'

export type ExampleSolvingData = (SolvingData[number] & { quizType: QuizType })[]

interface Params {
  quizzes: ExampleQuizType[]
}

export function ExampleQuiz({ quizzes }: Params) {
  const [state, setState] = useState<'intro' | 'solving' | 'end'>('intro')
  const { totalElapsedTime, runTimer, stopTimer } = useTimer()
  const [solvingData, setSolvingData] = useState<ExampleSolvingData>([])

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

  const { quizCompletedEvent } = useAmplitudeContext()

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
        elapsedTime: totalElapsedTime - solvingData.reduce((acc, cur) => acc + cur.elapsedTime, 0),
        quizType: curQuiz.quizType,
      },
    ]
    setSolvingData(newSolvingData)

    if (quizProgress.quizIndex === quizzes.length - 1) {
      stopTimer()
      setState('end')
      quizCompletedEvent({
        quizType: 'practice',
      })
      return
    }

    setQuizProgress((prev) => ({
      quizIndex: prev.quizIndex + 1,
      selectedMultipleQuizAnswer: null,
      selectedMixUpQuizAnswer: null,
      progress: 'idle',
    }))
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
        intro: (
          <ExampleQuizIntro
            quizType={curQuiz.quizType}
            quizzes={quizzes}
            className="mx-[20px] mt-[43px]"
          />
        ),
        solving: (
          <>
            <div className="pt-[12px]">
              <ExampleQuizHeader
                className="mb-[32px] px-[20px] lg:mb-[36px]"
                totalElapsedTime={totalElapsedTime}
              />

              <ExampleQuestion
                question={curQuiz.question}
                curQuizIndex={quizProgress.quizIndex}
                totalQuizCount={quizzes.length}
                totalElapsedTime={totalElapsedTime}
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
                        <ExampleMultipleOptions
                          quizProgress={quizProgress}
                          curQuiz={curQuiz}
                          onSelectAnswer={onSelectAnswer}
                          onVisibleAnimationEnd={() => runTimer()}
                          className="pt-[24px] lg:pt-[40px]"
                        />
                      ),
                      MIX_UP: (
                        <ExampleMixUpOptions
                          quizProgress={quizProgress}
                          curQuiz={curQuiz}
                          onSelectAnswer={onSelectAnswer}
                          onVisibleAnimationEnd={() => runTimer()}
                          className="pt-[40px] lg:pt-[58px]"
                        />
                      ),
                    }}
                  />
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
                isLoadingResult={false}
                explanation={curQuiz.explanation}
                next={next}
                className="mt-[48px] lg:mx-[20px] lg:mt-0"
              />
            ) : null}

            <ChoiceReact
              duration={SHOW_RESULT_DURATION}
              isCorrect={isCorrect}
              condition={quizProgress.progress === 'choose'}
            />
          </>
        ),
        end: <ExampleQuizResult totalElapsedTime={totalElapsedTime} results={solvingData} />,
      }}
    />
  )
}
