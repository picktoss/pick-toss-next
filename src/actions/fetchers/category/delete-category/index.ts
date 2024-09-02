'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface DeleteCategoryParams extends NextFetchRequestConfig {
  categoryId: number
}

export const deleteCategory = async ({ categoryId }: DeleteCategoryParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.category.deleteCategory(categoryId),
  })
  return result.data
}
