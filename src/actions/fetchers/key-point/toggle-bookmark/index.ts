'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ToggleBookmarkParams extends NextFetchRequestConfig {
  keyPointId: number
  bookmark: boolean
}

export interface ToggleBookmarkResponse {}

export const toggleBookmark = async ({ keyPointId, bookmark }: ToggleBookmarkParams) => {
  return await apiClient.fetch<ToggleBookmarkResponse>({
    endpoint: API_ENDPOINT.keyPoint.patchBookmark(keyPointId),
    body: {
      bookmark,
    },
  })
}
