'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface CreateCategoryParams extends NextFetchRequestConfig {
  name: string
  tag: string
  emoji: string
}

interface CreateCategoryResponse {
  id: number
}

export const createCategory = async ({ name, tag, emoji }: CreateCategoryParams) => {
  const result = await apiClient<CreateCategoryResponse>({
    endpoint: API_ENDPOINT.category.createCategory(),
    data: {
      name: name,
      tag: tag,
      emoji: emoji,
    },
  })
  return result.data
}
