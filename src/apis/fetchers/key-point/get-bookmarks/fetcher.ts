import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface GetBookmarksParams {
  accessToken: string
}

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

export const getBookmarks = async ({ accessToken }: GetBookmarksParams) => {
  return await apiClient.fetch<GetBookmarksResponse>({
    ...API_ENDPOINT.keypoint.getBookmark(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
