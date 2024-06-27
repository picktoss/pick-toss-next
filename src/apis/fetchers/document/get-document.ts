import { API_ENDPOINT } from '@/apis/api-endpoint'
import { DocumentStatus } from '@/apis/types/dto/document.dto'
import { apiClient } from '@/lib/api-client'
import { notFound } from 'next/navigation'

export interface DocumentInfo {
  id: number
  documentName: string
  status: DocumentStatus
  quizGenerationStatus: boolean
  category: {
    id: number
    name: string
  }
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
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
  try {
    return await apiClient.fetch<GetDocumentResponse>({
      ...API_ENDPOINT.document.getDocument(documentId),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (error) {
    if ((error as { status: number }).status === 400) {
      notFound()
    }
    throw new Error()
  }
}
