import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface ChangeAiPickParams extends NextFetchRequestConfig {
  aiPickCount: number
  accessToken: string
}

export const changeAiPick = async ({ aiPickCount, accessToken }: ChangeAiPickParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.test.changeAiPick(),
    body: {
      aiPickCount,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
