import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface GetCategoriesParams extends NextFetchRequestConfig {
  accessToken: string
}

export const CATEGORY_TAG_TYPE = [
  'IT',
  'ECONOMY',
  'HISTORY',
  'LANGUAGE',
  'MATH',
  'ART',
  'MEDICINE',
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
  }[]
}

interface GetCategoriesResponse {
  categories: Category[]
}

export const getCategories = async ({ accessToken }: GetCategoriesParams) => {
  return await apiClient.fetch<GetCategoriesResponse>({
    ...API_ENDPOINT.category.getCategories(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
