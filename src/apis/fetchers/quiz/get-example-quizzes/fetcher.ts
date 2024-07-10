import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'
import { QuizType } from '@/apis/types/dto/quiz.dto'

export interface ExampleQuizType {
  id: number
  question: string
  answer: string
  explanation: string
  options: string[]
  quizType: QuizType
}

interface ExampleQuizSetsResponse {
  quizzes: Omit<ExampleQuizType, 'id'>[]
}

export const getExampleQuizSets = async () => {
  return await apiClient.fetch<ExampleQuizSetsResponse>({
    ...API_ENDPOINT.quiz.getExampleQuizSets(),
  })
}
