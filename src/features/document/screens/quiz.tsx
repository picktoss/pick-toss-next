'use client'

import { Button } from '@/shared/components/ui/button'
import { useEffect, useState } from 'react'
import { Switch } from '@/shared/components/ui/switch'
import Text from '@/shared/components/ui/text'
import QuizList from '@/features/quiz/components/quiz-list'
import QuizCard from '@/features/quiz/components/quiz-card'
import { quizTypeFilters } from '../config'
import QuizCardMenu from '@/features/quiz/components/quiz-card-menu'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { useParams } from 'next/navigation'
import Loading from '@/shared/components/custom/loading'
import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'

const Quiz = () => {
  const { id } = useParams()
  const [quizType, setQuizType] = useState<Quiz.Type | 'ALL'>('ALL')
  const [answerMode, setAnswerMode] = useState(false)

  const { answerViewChangeEvent } = useAmplitudeContext()

  const params =
    quizType === 'ALL' ? { documentId: Number(id) } : { documentId: Number(id), quizType }

  const { data, isPending } = useQuery(queries.quiz.listByDocument(params))

  useEffect(() => {
    answerViewChangeEvent({ status: answerMode })
  }, [answerMode])

  if (isPending) {
    return (
      <div className="flex-center h-[calc(100dvh-300px)]">
        <Loading />
      </div>
    )
  }

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
          <Switch checked={answerMode} onClick={() => setAnswerMode(!answerMode)} />
        </div>
      </div>

      {/* 퀴즈 카드 */}
      <QuizList>
        {data?.quizzes.map((quiz) => (
          <QuizCard
            header={
              <div className="flex items-center justify-between text-icon-tertiary">
                <Text typography="title3" className="text-text-accent">
                  Q.
                </Text>
                <QuizCardMenu documentId={Number(id)} quizId={quiz.id} />
              </div>
            }
            key={quiz.id}
            quiz={quiz}
            answerMode={answerMode}
          />
        ))}
      </QuizList>
    </div>
  )
}

export default Quiz
