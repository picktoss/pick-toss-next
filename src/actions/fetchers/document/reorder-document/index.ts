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
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.reorderDocument(),
    body: {
      documentId,
      preDragDocumentOrder,
      afterDragDocumentOrder,
    },
  })
}
