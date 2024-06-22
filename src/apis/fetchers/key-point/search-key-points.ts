import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface SearchKeyPointsParams extends NextFetchRequestConfig {
  term: string

  accessToken: string
}

export interface SearchKeyPointsResponse {
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
    category: {
      id: number
      name: string
    }
    document: {
      id: number
      name: string
    }
    updatedAt: Date
  }[]
}

export const searchKeyPoints = async ({ term, accessToken }: SearchKeyPointsParams) => {
  return await apiClient.fetch<SearchKeyPointsResponse>({
    ...API_ENDPOINT.keypoint.searchKeyPoints(),
    body: {
      searchedWord: term,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
