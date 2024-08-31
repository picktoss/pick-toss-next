import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface UpdateDocumentNameParams extends NextFetchRequestConfig {
  accessToken: string
  documentId: number
  name: string
}

export const updateDocumentName = async ({
  documentId,
  name,
  accessToken,
}: UpdateDocumentNameParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.document.updateDocumentName(documentId),
    body: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
