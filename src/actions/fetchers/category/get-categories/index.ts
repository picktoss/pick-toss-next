'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

import { DocumentStatus } from '@/actions/types/dto/document.dto'

const CATEGORY_TAG_TYPE = [
  'IT',
  'ECONOMY',
  'HISTORY',
  'LANGUAGE',
  'MATH',
  'ART',
  'MEDICINE',
  'ETC',
  'DEFAULT',
] as const

export type CategoryTagType = (typeof CATEGORY_TAG_TYPE)[number]

export interface Category {
  id: number
  name: string
  tag: CategoryTagType
  order: number
  emoji?: string
  documents: {
    id: number
    name: string
    order: number
    documentStatus: DocumentStatus
  }[]
}

interface GetCategoriesResponse {
  categories: Category[]
}

export const getCategories = async () => {
  const result = await apiClient<GetCategoriesResponse>({
    endpoint: API_ENDPOINT.category.getCategories(),
  })
  return result.data
}
