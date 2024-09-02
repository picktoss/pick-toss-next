'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ToggleBookmarkParams extends NextFetchRequestConfig {
  keyPointId: number
  bookmark: boolean
}

export interface ToggleBookmarkResponse {}

export const toggleBookmark = async ({ keyPointId, bookmark }: ToggleBookmarkParams) => {
  const result = await apiClient<ToggleBookmarkResponse>({
    endpoint: API_ENDPOINT.keyPoint.patchBookmark(keyPointId),
    data: {
      bookmark,
    },
  })
  return result.data
}
