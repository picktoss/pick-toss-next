import { API_ENDPOINT } from '@/apis/api-endpoint'
import { SolvingData } from '@/app/(routes)/quiz/types'
import { apiClient } from '@/lib/api-client'

interface PatchQuizResultParams extends NextFetchRequestConfig {
  data: {
    quizSetId: string
    quizzes: SolvingData
  }

  accessToken: string
}

interface PatchQuizResultResponse {}

export const patchQuizResult = async ({ data, accessToken }: PatchQuizResultParams) => {
  return await apiClient.fetch<PatchQuizResultResponse>({
    ...API_ENDPOINT.quiz.patchQuizResult(),
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
