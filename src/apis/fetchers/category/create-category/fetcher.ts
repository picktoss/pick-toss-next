import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface CreateCategoryParams extends NextFetchRequestConfig {
  name: string
  tag: string
  emoji: string

  accessToken: string
}

interface CreateCategoryResponse {
  id: number
}

export const createCategory = async ({ name, tag, emoji, accessToken }: CreateCategoryParams) => {
  return await apiClient.fetch<CreateCategoryResponse>({
    ...API_ENDPOINT.category.createCategory(),
    body: {
      name: name,
      tag: tag,
      emoji: emoji,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
