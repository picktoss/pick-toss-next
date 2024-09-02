import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface CreateDocumentParams {
  file: File
  documentName: string
  categoryId: number

  accessToken: string
}

interface CreateDocumentResponse {
  id: number
}

export const createDocument = async (params: CreateDocumentParams) => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('documentName', params.documentName)
  formData.append('categoryId', String(params.categoryId))

  try {
    const result = await apiClient<CreateDocumentResponse>({
      endpoint: API_ENDPOINT.document.createDocument(),
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${params.accessToken}`,
      },
    })
    return result.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
