import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface DeleteCategoryParams extends NextFetchRequestConfig {
  categoryId: number
  accessToken: string
}

export const deleteCategory = async ({ categoryId, accessToken }: DeleteCategoryParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.category.deleteCategory(categoryId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
