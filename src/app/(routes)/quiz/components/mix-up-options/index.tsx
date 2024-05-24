'use client'

import { QuizDTO } from '@/apis/types/dto/quiz.dto'
import MixUpOption from './components/option'
import { HTMLAttributes } from 'react'
import { QuizProgress } from '../../types'

interface MixUpOptionsProps extends HTMLAttributes<HTMLDivElement> {
  quizProgress: QuizProgress
  curQuiz: QuizDTO
  onSelectAnswer: (answer: 'correct' | 'incorrect') => Promise<void>
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
      </div>
    </div>
  )
}
