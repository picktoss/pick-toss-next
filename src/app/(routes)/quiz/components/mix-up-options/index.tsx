'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import MixUpOption from './components/option'
import { HTMLAttributes } from 'react'
import { QuizProgress } from '../../types'
import { motion } from 'framer-motion'

interface MixUpOptionsProps extends HTMLAttributes<HTMLDivElement> {
  quizProgress: QuizProgress
  curQuiz: QuizDTO
  onSelectAnswer: (answer: 'correct' | 'incorrect') => Promise<void>
  onVisibleAnimationEnd: () => void
}

export default function MixUpOptions({
  quizProgress,
  curQuiz,
  onSelectAnswer,
  onVisibleAnimationEnd,
  className,
}: MixUpOptionsProps) {
  return (
    <div className={className}>
      <motion.div
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
            key={`correct-${curQuiz.id}`}
            variant="correct"
            onClick={() => onSelectAnswer('correct')}
            progress={quizProgress.progress}
            isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
          />
        ) : null}
        {quizProgress.progress === 'idle' ||
        quizProgress.selectedMixUpQuizAnswer === 'incorrect' ? (
          <MixUpOption
            key={`incorrect-${curQuiz.id}`}
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
