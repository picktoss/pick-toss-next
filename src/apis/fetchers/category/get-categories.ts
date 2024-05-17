import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

// interface GetCategoriesParams extends NextFetchRequestConfig {}

export interface Category {
  id: number
  name: string
  tag: string
  order: number
  emoji: string
  documents: {
    id: number
    name: string
    order: number
  }[]
}

interface GetCategoriesResponse {
  category: Category[]
}

export const getCategories = async (/* params?: GetCategoriesParams */) => {
  const session = await auth()

  return await apiClient.fetch<GetCategoriesResponse>({
    ...API_ENDPOINT.category.getCategories(),
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
}
