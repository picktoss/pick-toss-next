'use client'

import { HTMLAttributes } from 'react'
import { QuizProgress } from '../../types'
import { motion } from 'framer-motion'
import type { ExampleQuizType } from '@/apis/fetchers/quiz/get-example-quizzes/fetcher'
import MixUpOption from '../../components/mix-up-options/components/option'

interface MixUpOptionsProps extends HTMLAttributes<HTMLDivElement> {
  quizProgress: QuizProgress
  curQuiz: ExampleQuizType
  onSelectAnswer: (answer: 'correct' | 'incorrect') => Promise<void>
  onVisibleAnimationEnd: () => void
}

export default function ExampleMixUpOptions({
  quizProgress,
  curQuiz,
  onSelectAnswer,
  onVisibleAnimationEnd,
  className,
}: MixUpOptionsProps) {
  return (
    <div className={className}>
      <motion.div
        key={curQuiz.id}
        className="flex w-full justify-center gap-[10px] px-[20px] lg:gap-[24px]"
        initial={{ y: 30, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        onAnimationComplete={onVisibleAnimationEnd}
      >
        {quizProgress.progress === 'idle' || quizProgress.selectedMixUpQuizAnswer === 'correct' ? (
          <MixUpOption
            variant="correct"
            onClick={() => onSelectAnswer('correct')}
            progress={quizProgress.progress}
            isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
          />
        ) : null}
        {quizProgress.progress === 'idle' ||
        quizProgress.selectedMixUpQuizAnswer === 'incorrect' ? (
          <MixUpOption
            variant="incorrect"
            onClick={() => onSelectAnswer('incorrect')}
            progress={quizProgress.progress}
            isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
          />
        ) : null}
      </motion.div>
    </div>
  )
}
