'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateDocumentNameParams extends NextFetchRequestConfig {
  documentId: number
  name: string
}

export const updateDocumentName = async ({ documentId, name }: UpdateDocumentNameParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.document.updateDocumentName(documentId),
    data: {
      name,
    },
  })
  return result.data
}
