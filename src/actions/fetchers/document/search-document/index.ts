'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface SearchDocumentParams extends NextFetchRequestConfig {
  term: string
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

export const searchDocument = async ({ term }: SearchDocumentParams) => {
  return await apiClient.fetch<SearchDocumentResponse>({
    endpoint: API_ENDPOINT.document.searchDocument(),
    body: {
      word: term,
    },
  })
}
