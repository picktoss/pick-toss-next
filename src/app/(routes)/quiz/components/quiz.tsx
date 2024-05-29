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
import { patchQuizResult } from '@/apis/fetchers/quiz/patch-quiz-result'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import QuizResult from './quiz-result'

interface QuizProps {
  quizzes: QuizDTO[]
}

export default function Quiz({ quizzes }: QuizProps) {
  const quizSetId = useSearchParams().get('quizSetId') || ''
  const session = useSession()

  const [state, setState] = useState<'intro' | 'solving' | 'end'>('end')
  const { totalElapsedTime, runTimer, stopTimer } = useTimer()
  const [solvingData, setSolvingData] = useState<SolvingData>([])

  const { mutate: patchQuizResultMutate } = useMutation({
    mutationKey: ['patchQuizResult'],
    mutationFn: (solvingData: SolvingData) =>
      patchQuizResult({
        data: {
          quizSetId,
          quizzes: solvingData,
        },
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

    if (quizProgress.quizIndex === quizzes.length - 1) {
      patchQuizResultMutate(newSolvingData, {
        onSuccess: () => {
          setState('end')
        },
      })
      return
    }

    setSolvingData(newSolvingData)
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
        intro: <QuizIntro quizzes={quizzes} className="mx-[20px] mt-[43px]" />,
        solving: (
          <div className="pt-[12px]">
            <QuizHeader className="mb-[32px] px-[20px]" totalElapsedTime={totalElapsedTime} />
            <Question
              categoryName={curQuiz.category.name}
              documentName={curQuiz.document.name}
              question={curQuiz.question}
              curQuizIndex={quizProgress.quizIndex}
              totalQuizCount={quizzes.length}
            />
            <SwitchCase
              value={curQuiz.quizType}
              caseBy={{
                MULTIPLE_CHOICE: (
                  <MultipleOptions
                    quizProgress={quizProgress}
                    curQuiz={curQuiz}
                    onSelectAnswer={onSelectAnswer}
                    onVisibleAnimationEnd={() => runTimer()}
                    className="mt-[24px]"
                  />
                ),
                MIX_UP: (
                  <MixUpOptions
                    quizProgress={quizProgress}
                    curQuiz={curQuiz}
                    onSelectAnswer={onSelectAnswer}
                    onVisibleAnimationEnd={() => runTimer()}
                    className="mt-[40px]"
                  />
                ),
              }}
            />
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
                className="mt-[48px]"
              />
            ) : null}
          </div>
        ),
        end: <QuizResult />,
      }}
    />
  )
}
