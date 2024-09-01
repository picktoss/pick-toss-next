'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface DeleteDocumentParams extends NextFetchRequestConfig {
  documentId: number
}

export const deleteDocument = async ({ documentId }: DeleteDocumentParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.deleteDocument(documentId),
  })
}
