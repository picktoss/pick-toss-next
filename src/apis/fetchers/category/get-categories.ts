import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

// interface GetCategoriesParams extends NextFetchRequestConfig {}

export type CategoryTagType =
  | 'IT'
  | 'ECONOMY'
  | 'HISTORY'
  | 'LANGUAGE'
  | 'MATH'
  | 'ETC'
  | 'ART'
  | 'MEDICINE'

export interface Category {
  id: number
  name: string
  tag: CategoryTagType
  order: number
  emoji: string
  documents: {
    id: number
    name: string
    order: number
  }[]
}

interface GetCategoriesResponse {
  categories: Category[]
}

export const getCategories = async (accessToken: string | undefined) => {
  return await apiClient.fetch<GetCategoriesResponse>({
    ...API_ENDPOINT.category.getCategories(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
