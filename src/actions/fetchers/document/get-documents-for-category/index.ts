'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

export interface Document {
  id: number
  name: string
  status:
    | 'UNPROCESSED'
    | 'PROCESSED'
    | 'PROCESSING'
    | 'KEYPOINT_UPDATE_POSSIBLE'
    | 'DEFAULT_DOCUMENT'
  todayQuizIncluded: boolean
  createdAt: string
  updatedAt: string
}

interface GetDocumentsForCategory extends NextFetchRequestConfig {
  categoryId: number
  sortOption?: 'createdAt' | 'name' | 'updatedAt'
}

interface GetDocumentsForCategoryResponse {
  documents: Document[]
}

export const getDocumentsForCategory = async ({
  categoryId,
  sortOption,
}: GetDocumentsForCategory) => {
  return await apiClient.fetch<GetDocumentsForCategoryResponse>({
    endpoint: API_ENDPOINT.document.getDocumentsForCategory(categoryId, sortOption),
  })
}
