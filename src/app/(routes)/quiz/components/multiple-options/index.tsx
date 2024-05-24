'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import MultipleOption, { optionVariants } from './components/option'
import { HTMLAttributes, useEffect, useState } from 'react'
import { VariantProps } from 'class-variance-authority'
import { QuizProgress } from '../../types'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
    },
  },
}

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
    <div className={className} key={curQuiz.id}>
      <motion.ul
        className="flex flex-col gap-[20px] px-[20px]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {curQuiz.options.map((option, idx) => (
          <motion.li key={idx} variants={item}>
            <MultipleOption
              option={option}
              onClick={() => onSelectAnswer(idx)}
              order={String.fromCharCode(65 + idx)}
              variant={multipleOptionVariants[idx]}
              disabled={quizProgress.selectedMultipleQuizAnswer != null}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
