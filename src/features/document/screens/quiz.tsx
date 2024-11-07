'use client'

import { Button } from '@/shared/components/ui/button'
import { useState } from 'react'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import { useQuizListContext } from '../contexts/quiz-list-context'
import { quizTypeFilters } from '../constants/quiz-type'
import QuizList from '@/features/quiz/components/quiz-list'
import QuizCard from '@/features/quiz/components/quiz-card'
import { quizzes } from '@/features/quiz/config'

const Quiz = () => {
  const [quizType, setQuizType] = useState('ALL')
  const { showAnswer, setShowAnswer } = useQuizListContext()

  return (
    <div className="flex flex-col items-center p-[20px] pb-[132px]">
      {/* 퀴즈 목록 컨트롤러 */}
      <div className="mb-[16px] flex w-full items-center justify-between">
        <div className="flex items-center gap-[8px]">
          {quizTypeFilters.map((type) => (
            <Button
              key={type.key}
              variant="smallRound"
              colors={quizType === type.key ? 'selected' : 'outlined'}
              onClick={() => setQuizType(type.key)}
            >
              {type.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center">
          <Text typography="text2-medium" className="mr-[8px] text-text-sub">
            정답 표시
          </Text>
          <Switch onClick={() => setShowAnswer(!showAnswer)} />
        </div>
      </div>

      {/* 퀴즈 카드 */}
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} showExplanation={showAnswer} />
        ))}
      </QuizList>
    </div>
  )
}

export default Quiz
