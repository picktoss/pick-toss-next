'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

import { DocumentStatus } from '@/actions/types/dto/document.dto'
import { CATEGORY_TAG_TYPE } from '@/types/category'

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
  return await apiClient.fetch<GetCategoriesResponse>({
    endpoint: API_ENDPOINT.category.getCategories(),
  })
}
