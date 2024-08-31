import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface ReorderCategoryParams extends NextFetchRequestConfig {
  accessToken: string
  categoryId: number
  preDragCategoryOrder: number
  afterDragCategoryOrder: number
}

export const reorderCategory = async ({
  categoryId,
  preDragCategoryOrder,
  afterDragCategoryOrder,
  accessToken,
}: ReorderCategoryParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.category.reorderCategory(),
    body: {
      categoryId,
      preDragCategoryOrder,
      afterDragCategoryOrder,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
