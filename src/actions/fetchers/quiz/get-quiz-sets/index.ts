'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface Document {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

interface BaseQuiz<T> {
  id: number
  question: string
  quizType: T
  document: Document
  category: Category
  explanation: string
}

interface MixUpQuiz extends BaseQuiz<'MIX_UP'> {
  answer: 'correct' | 'incorrect'
  options: []
}

interface MultipleChoiceQuiz extends BaseQuiz<'MULTIPLE_CHOICE'> {
  answer: string
  options: string[]
}

interface GetQuizSetsParams extends NextFetchRequestConfig {
  quizSetId: string
}

export interface GetQuizSetsResponse {
  quizzes: (MixUpQuiz | MultipleChoiceQuiz)[]
  todayQuizSet: boolean
}

export const getQuizSets = async (params: GetQuizSetsParams) => {
  try {
    return await apiClient.fetch<GetQuizSetsResponse>({
      endpoint: API_ENDPOINT.quiz.getQuizSets(params.quizSetId),
    })
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
