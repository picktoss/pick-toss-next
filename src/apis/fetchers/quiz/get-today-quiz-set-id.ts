import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

// interface GetTodayQuizSetIdParams extends NextFetchRequestConfig {}

export type TodayQuizSetType = 'READY' | 'NOT_READY' | 'DONE'

interface GetTodayQuizSetIdResponse {
  quizSetId: string
  type: TodayQuizSetType
}

export const getTodayQuizSetId = async (/* params?: GetTodayQuizIdParams */) => {
  const session = await auth()

  return await apiClient.fetch<GetTodayQuizSetIdResponse>({
    ...API_ENDPOINT.quiz.getTodayQuizSetId(),
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
}
