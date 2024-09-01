'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { QuizType } from '@/actions/types/dto/quiz.dto'

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
    endpoint: API_ENDPOINT.quiz.getExampleQuizSets(),
  })
}
