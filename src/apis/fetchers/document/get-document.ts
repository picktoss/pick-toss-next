import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

export interface DocumentInfo {
  id: number
  documentName: string
  status: 'UNPROCESSED' | 'PROCESSED'
  quizGenerationStatus: boolean
  category: {
    id: number
    name: string
  }
  keyPoints: {
    id: number
    question: string
    answer: string
  }[]
  content: string
  createdAt: string
}

interface GetDocumentParams extends NextFetchRequestConfig {
  accessToken: string
  documentId: number
}

interface GetDocumentResponse extends DocumentInfo {}

export const getDocument = async ({ accessToken, documentId }: GetDocumentParams) => {
  return await apiClient.fetch<GetDocumentResponse>({
    ...API_ENDPOINT.document.getDocument(documentId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
