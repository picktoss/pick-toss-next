'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import MixUpOption from './components/option'
import { HTMLAttributes } from 'react'
import { QuizProgress } from '../../types'

interface MixUpOptionsProps {
  quizProgress: QuizProgress
  curQuiz: QuizDTO
  onSelectAnswer: (answer: 'correct' | 'incorrect') => Promise<void>
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function MixUpOptions({
  quizProgress,
  curQuiz,
  onSelectAnswer,
  className,
}: MixUpOptionsProps) {
  return (
    <div className={className}>
      <div className="flex w-full justify-center gap-[10px] px-[20px] lg:gap-[24px]">
        <MixUpOption
          variant="correct"
          onClick={() => onSelectAnswer('correct')}
          progress={quizProgress.progress}
          isSelected={quizProgress.selectedMixUpQuizAnswer === 'correct'}
          isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
        />
        <MixUpOption
          variant="incorrect"
          onClick={() => onSelectAnswer('incorrect')}
          progress={quizProgress.progress}
          isSelected={quizProgress.selectedMixUpQuizAnswer === 'incorrect'}
          isCorrect={quizProgress.selectedMixUpQuizAnswer === curQuiz.answer}
        />
      </div>
    </div>
  )
}
