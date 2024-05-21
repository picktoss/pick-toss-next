import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface CreateDocumentParams extends NextFetchRequestConfig {
  accessToken: string

  file: File
  documentName: string
  categoryId: number
}

interface CreateDocumentResponse {
  id: number
}

export const createDocument = async (params: CreateDocumentParams) => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('documentName', params.documentName)
  formData.append('categoryId', String(params.categoryId))

  return await apiClient.fetch<CreateDocumentResponse>({
    ...API_ENDPOINT.document.createDocument(),
    body: formData,
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
