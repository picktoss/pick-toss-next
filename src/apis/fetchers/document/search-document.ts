import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface SearchDocumentParams extends NextFetchRequestConfig {
  term: string

  accessToken: string
}

export interface SearchDocumentResponse {
  documents: {
    documentId: number
    documentName: string
    content: string
    category: {
      id: number
      name: string
    }
  }[]
}

export const searchDocument = async ({ term, accessToken }: SearchDocumentParams) => {
  return await apiClient.fetch<SearchDocumentResponse>({
    ...API_ENDPOINT.document.searchDocument(),
    body: {
      word: term,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
