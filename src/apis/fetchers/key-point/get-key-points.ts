import { API_ENDPOINT } from '@/apis/api-endpoint'
import { DocumentStatus } from '@/apis/types/dto/document.dto'
import { apiClient } from '@/lib/api-client'

interface GetKeyPointsByIdParams {
  documentId: number

  accessToken: string
}

export interface GetKeyPointsByIdResponse {
  documentStatus: DocumentStatus
  keyPoints: {
    id: number
    question: string
    answer: string
    bookmark: boolean
    updatedAt: Date
  }[]
}

export const getKeyPointsById = async ({ accessToken, documentId }: GetKeyPointsByIdParams) => {
  return await apiClient.fetch<GetKeyPointsByIdResponse>({
    ...API_ENDPOINT.keypoint.getPickPointsById(documentId),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
