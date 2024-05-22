'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import QuizIntro from './quiz-intro'
import { useEffect, useState } from 'react'
import QuizHeader from './quiz-header'
import AnswerOption, { optionVariants } from './answer-option'
import { VariantProps } from 'class-variance-authority'

interface QuizProps {
  quizzes: QuizDTO[]
}

export default function Quiz({ quizzes }: QuizProps) {
  const [state, setState] = useState<'intro' | 'solving'>('intro')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizIndex, setQuizIndex] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [variants, setVariants] = useState<VariantProps<typeof optionVariants>['variant'][]>([])

  const curQuiz = quizzes[quizIndex]

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('solving')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const onSelectAnswer = (order: number) => {
    setSelectedOrder(order)

    setTimeout(() => {
      setShowResult(true)
    }, 1500)
  }

  useEffect(() => {
    if (selectedOrder == null) {
      setVariants(Array(curQuiz.options.length).fill('idle'))
    } else {
      const newVariants = curQuiz.options.map((option, idx) => {
        if (!showResult) {
          return selectedOrder === idx ? 'choose' : 'idle'
        } else {
          if (curQuiz.answer === option) {
            return 'correct'
          }
          if (selectedOrder === idx && curQuiz.answer !== option) {
            return 'incorrect'
          }

          return 'disabled'
        }
      })
      setVariants(newVariants)
    }
  }, [selectedOrder, showResult, curQuiz])

  return (
    <div className="pt-[12px]">
      {state === 'intro' ? (
        <QuizIntro quizzes={quizzes} />
      ) : (
        <div>
          <QuizHeader className="mb-[32px]" />
          <div className="mb-[24px]">
            <div className="w-full overflow-hidden rounded-[12px]">
              <div className="relative h-[8px] *:h-[8px]">
                <div className="bg-gray-02" />
                <div className="absolute left-0 top-0 w-1/4 bg-orange-04" />
              </div>
              <div className="flex flex-col gap-[8px] bg-white px-[20px] pb-[40px] pt-[32px]">
                <div className="text-small1-regular text-gray-07">
                  {curQuiz.category.name} {'>'} {curQuiz.document.name}
                </div>
                <div className="flex items-start gap-[8px]">
                  <div className="text-h3-bold text-orange-06">Q</div>
                  <div className="text-h4-bold text-gray-09">{curQuiz.question}</div>
                </div>
              </div>
            </div>
          </div>
          {curQuiz.quizType === 'MULTIPLE_CHOICE' ? (
            <div className="flex flex-col gap-[20px]">
              {curQuiz.options.map((option, idx) => (
                <AnswerOption
                  key={idx}
                  option={option}
                  onClick={() => onSelectAnswer(idx)}
                  order={String.fromCharCode(65 + idx)}
                  variant={variants[idx]}
                  disabled={selectedOrder != null}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}
