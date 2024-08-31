import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'
import { CategoryTagType } from '../get-categories/fetcher'

interface UpdateCategoryParams extends NextFetchRequestConfig {
  accessToken: string
  categoryId: number
  tag: CategoryTagType
  name: string
  emoji: string
}

export const updateCategory = async ({
  categoryId,
  name,
  tag,
  emoji,
  accessToken,
}: UpdateCategoryParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.category.updateCategory(categoryId),
    body: {
      name: name,
      categoryTag: tag,
      emoji: emoji,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
