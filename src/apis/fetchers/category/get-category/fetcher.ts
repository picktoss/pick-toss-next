import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'
import { CategoryTagType } from '../get-categories/fetcher'

interface GetCategoryParams {
  accessToken: string
  categoryId: number
}

interface GetCategoryResponse {
  id: number
  name: string
  tag: CategoryTagType
  emoji: string
  order: number
}

export const getCategory = async ({ accessToken, categoryId }: GetCategoryParams) => {
  return await apiClient.fetch<GetCategoryResponse>({
    ...API_ENDPOINT.category.getCategory(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
