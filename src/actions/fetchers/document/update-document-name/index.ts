'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateDocumentNameParams extends NextFetchRequestConfig {
  documentId: number
  name: string
}

export const updateDocumentName = async ({ documentId, name }: UpdateDocumentNameParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.document.updateDocumentName(documentId),
    body: {
      name,
    },
  })
}
