import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

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
}

export const getQuizSets = async (params: GetQuizSetsParams) => {
  const session = await auth()

  return await apiClient.fetch<GetQuizSetsResponse>({
    ...API_ENDPOINT.quiz.getQuizSets(params.quizSetId),
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
}
