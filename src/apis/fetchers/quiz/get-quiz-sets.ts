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

type Quiz<T> = {
  id: number
  question: string
  answer: T
  options: string[]
  quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'
  document: Document
  category: Category
}

type MultipleChoiceQuiz = Quiz<string> & { quizType: 'MULTIPLE_CHOICE' }
type MixUpQuiz = Quiz<'correct' | 'incorrect'> & { quizType: 'MIX_UP' }

interface GetQuizSetsParams extends NextFetchRequestConfig {
  quizSetId: string
}

export interface GetQuizSetsResponse {
  quizzes: (MultipleChoiceQuiz | MixUpQuiz)[]
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
