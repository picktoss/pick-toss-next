import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface CreateDocumentParams extends NextFetchRequestConfig {
  accessToken: string

  file: File
  userDocumentName: string
  categoryId: string
}

interface CreateDocumentResponse {
  id: number
}

export const createDocument = async (params: CreateDocumentParams) => {
  return await apiClient.fetch<CreateDocumentResponse>({
    ...API_ENDPOINT.document.createDocument(),
    body: {
      file: params.file,
      userDocumentName: params.userDocumentName,
      categoryId: String(params.categoryId),
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
