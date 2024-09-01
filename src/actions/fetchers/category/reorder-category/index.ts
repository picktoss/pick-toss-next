'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface ReorderCategoryParams extends NextFetchRequestConfig {
  categoryId: number
  preDragCategoryOrder: number
  afterDragCategoryOrder: number
}

export const reorderCategory = async ({
  categoryId,
  preDragCategoryOrder,
  afterDragCategoryOrder,
}: ReorderCategoryParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.category.reorderCategory(),
    body: {
      categoryId,
      preDragCategoryOrder,
      afterDragCategoryOrder,
    },
  })
}
