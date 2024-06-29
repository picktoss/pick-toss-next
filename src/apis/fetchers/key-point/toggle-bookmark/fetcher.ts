import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface ToggleBookmarkParams extends NextFetchRequestConfig {
  keypointId: number
  bookmark: boolean

  accessToken: string
}

export interface ToggleBookmarkResponse {}

export const toggleBookmark = async ({
  keypointId,
  bookmark,
  accessToken,
}: ToggleBookmarkParams) => {
  return await apiClient.fetch<ToggleBookmarkResponse>({
    ...API_ENDPOINT.keypoint.patchBookmark(keypointId),
    body: {
      bookmark,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
