import { API_ENDPOINT } from '@/apis/api-endpoint'
import { SolvingData } from '@/app/(routes)/quiz/types'
import { apiClient } from '@/shared/api-client'

interface PatchQuizResultParams extends NextFetchRequestConfig {
  data: {
    quizSetId: string
    quizzes: SolvingData
  }

  accessToken: string
}

interface PatchQuizResultResponse {
  reward: number | null
}

export const patchQuizResult = async ({ data, accessToken }: PatchQuizResultParams) => {
  return await apiClient.fetch<PatchQuizResultResponse>({
    ...API_ENDPOINT.quiz.patchQuizResult(),
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
