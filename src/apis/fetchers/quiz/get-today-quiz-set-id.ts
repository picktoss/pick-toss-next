import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

// interface GetTodayQuizSetIdParams extends NextFetchRequestConfig {}

interface GetTodayQuizSetIdResponse {
  quizSetId: string
  type: 'ready' | 'done' | 'notReady'
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
