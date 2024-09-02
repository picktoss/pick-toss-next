'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface GetBookmarksResponse {
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

export const getBookmarks = async () => {
  const result = await apiClient<GetBookmarksResponse>({
    endpoint: API_ENDPOINT.keyPoint.getBookmark(),
  })
  return result.data
}
