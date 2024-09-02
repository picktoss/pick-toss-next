'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ReorderDocumentParams extends NextFetchRequestConfig {
  documentId: number
  preDragDocumentOrder: number
  afterDragDocumentOrder: number
}

export const reorderDocument = async ({
  documentId,
  preDragDocumentOrder,
  afterDragDocumentOrder,
}: ReorderDocumentParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.document.reorderDocument(),
    data: {
      documentId,
      preDragDocumentOrder,
      afterDragDocumentOrder,
    },
  })
  return result.data
}
