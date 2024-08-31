import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

export interface TopFive {
  documents: {
    id: number
    name: string
    incorrectAnswerCount: number
    category: {
      id: number
      name: string
    }
  }[]
}

interface GetTopFiveParams extends NextFetchRequestConfig {
  accessToken: string
}

interface GetTopFiveResponse extends TopFive {}

export const getTopFive = async ({ accessToken }: GetTopFiveParams) => {
  return await apiClient.fetch<GetTopFiveResponse>({
    ...API_ENDPOINT.document.getTopFive(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
