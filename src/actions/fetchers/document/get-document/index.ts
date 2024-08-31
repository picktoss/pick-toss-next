import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'
import { PrivateRequest } from '@/actions/types'
import { DocumentStatus } from '@/actions/types/dto/document.dto'
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

interface GetDocumentParams extends PrivateRequest {
  documentId: number
}

interface GetDocumentResponse extends DocumentInfo {}

export const getDocument = async ({ documentId, accessToken }: GetDocumentParams) => {
  try {
    return await apiClient.fetch<GetDocumentResponse>({
      endpoint: API_ENDPOINT.document.getDocument(documentId),
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