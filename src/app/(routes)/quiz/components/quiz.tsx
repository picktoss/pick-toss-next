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
import { QuizProgress } from '../types'
import { INTRO_DURATION, SHOW_RESULT_DURATION } from '../constants'
import { SwitchCase } from '@/components/react/switch-case'

interface QuizProps {
  quizzes: QuizDTO[]
}

export default function Quiz({ quizzes }: QuizProps) {
  const [state, setState] = useState<'intro' | 'solving'>('intro')

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('solving')
    }, INTRO_DURATION)

    return () => clearTimeout(timer)
  }, [])

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
    if (quizProgress.quizIndex === quizzes.length - 1) {
      return
    }

    setQuizProgress((prev) => ({
      quizIndex: prev.quizIndex + 1,
      selectedMultipleQuizAnswer: null,
      selectedMixUpQuizAnswer: null,
      progress: 'idle',
    }))
  }

  return (
    <SwitchCase
      value={state}
      caseBy={{
        intro: <QuizIntro quizzes={quizzes} className="mx-[20px] mt-[43px]" />,
        solving: (
          <div className="pt-[12px]">
            <QuizHeader className="mb-[32px] px-[20px]" />
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
                    className="mt-[24px]"
                  />
                ),
                MIX_UP: (
                  <MixUpOptions
                    quizProgress={quizProgress}
                    curQuiz={curQuiz}
                    onSelectAnswer={onSelectAnswer}
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
      }}
    />
  )
}
