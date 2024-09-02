import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateDocumentNameParams extends NextFetchRequestConfig {
  documentId: number
  name: string
  file: File

  accessToken: string
}

export const updateDocumentContent = async (params: UpdateDocumentNameParams) => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('name', params.name)

  const result = await apiClient({
    endpoint: API_ENDPOINT.document.updateDocumentContent(params.documentId),
    data: formData,
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
  return result.data
}
