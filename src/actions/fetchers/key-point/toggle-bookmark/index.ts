'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ToggleBookmarkParams extends NextFetchRequestConfig {
  keypointId: number
  bookmark: boolean
}

export interface ToggleBookmarkResponse {}

export const toggleBookmark = async ({ keypointId, bookmark }: ToggleBookmarkParams) => {
  return await apiClient.fetch<ToggleBookmarkResponse>({
    endpoint: API_ENDPOINT.keyPoint.patchBookmark(keypointId),
    body: {
      bookmark,
    },
  })
}
