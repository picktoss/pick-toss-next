'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import MultipleOption, { optionVariants } from './components/option'
import { HTMLAttributes, useEffect, useState } from 'react'
import { VariantProps } from 'class-variance-authority'
import { QuizProgress } from '../../types'

interface MultipleOptionsProps {
  quizProgress: QuizProgress
  curQuiz: QuizDTO
  onSelectAnswer: (answer: number) => Promise<void>
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function MultipleOptions({
  quizProgress,
  curQuiz,
  onSelectAnswer,
  className,
}: MultipleOptionsProps) {
  const [multipleOptionVariants, setMultipleOptionVariants] = useState<
    VariantProps<typeof optionVariants>['variant'][]
  >([])

  useEffect(() => {
    const newMultipleOptionVariants = curQuiz.options.map((option, idx) => {
      switch (quizProgress.progress) {
        case 'idle':
          return 'idle'
        case 'choose':
          return quizProgress.selectedMultipleQuizAnswer === idx ? 'choose' : 'idle'
        case 'result':
          if (curQuiz.answer === option) {
            return 'correct'
          }
          if (quizProgress.selectedMultipleQuizAnswer === idx && curQuiz.answer !== option) {
            return 'incorrect'
          }
          return 'disabled'
      }
    })

    setMultipleOptionVariants(newMultipleOptionVariants)
  }, [curQuiz, quizProgress])

  return (
    <div className={className}>
      <div className="flex flex-col gap-[20px] px-[20px]">
        {curQuiz.options.map((option, idx) => (
          <MultipleOption
            key={idx}
            option={option}
            onClick={() => onSelectAnswer(idx)}
            order={String.fromCharCode(65 + idx)}
            variant={multipleOptionVariants[idx]}
            disabled={quizProgress.selectedMultipleQuizAnswer != null}
          />
        ))}
      </div>
    </div>
  )
}
