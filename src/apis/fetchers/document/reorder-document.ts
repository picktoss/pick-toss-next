import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface ReorderDocumentParams extends NextFetchRequestConfig {
  accessToken: string
  documentId: number
  preDragDocumentOrder: number
  afterDragDocumentOrder: number
}

export const reorderDocument = async ({
  documentId,
  preDragDocumentOrder,
  afterDragDocumentOrder,
  accessToken,
}: ReorderDocumentParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.document.reorderDocument(),
    body: {
      documentId,
      preDragDocumentOrder,
      afterDragDocumentOrder,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
