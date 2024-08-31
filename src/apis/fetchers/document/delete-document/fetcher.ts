import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface DeleteDocumentParams extends NextFetchRequestConfig {
  documentId: number
  accessToken: string
}

export const deleteDocument = async ({ documentId, accessToken }: DeleteDocumentParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.document.deleteDocument(documentId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
