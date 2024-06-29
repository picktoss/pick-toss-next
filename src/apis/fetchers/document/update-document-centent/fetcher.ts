import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface UpdateDocumentNameParams extends NextFetchRequestConfig {
  accessToken: string
  documentId: number
  name: string
  file: File
}

export const updateDocumentContent = async (params: UpdateDocumentNameParams) => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('name', params.name)

  return await apiClient.fetch({
    ...API_ENDPOINT.document.updateDocumentContent(params.documentId),
    body: formData,
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
