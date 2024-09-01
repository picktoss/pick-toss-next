'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface DeleteCategoryParams extends NextFetchRequestConfig {
  categoryId: number
}

export const deleteCategory = async ({ categoryId }: DeleteCategoryParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.category.deleteCategory(categoryId),
  })
}
