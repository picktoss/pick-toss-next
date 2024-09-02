'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface SearchKeyPointsParams extends NextFetchRequestConfig {
  term: string
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

export const searchKeyPoints = async ({ term }: SearchKeyPointsParams) => {
  const result = await apiClient<SearchKeyPointsResponse>({
    endpoint: API_ENDPOINT.keyPoint.searchKeyPoints(),
    data: {
      searchedWord: term,
    },
  })
  return result.data
}
