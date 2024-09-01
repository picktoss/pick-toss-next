'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface CreateDocumentParams extends NextFetchRequestConfig {
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
    endpoint: API_ENDPOINT.document.createDocument(),
    body: formData,
  })
}
