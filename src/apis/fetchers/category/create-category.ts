import { API_ENDPOINT } from '@/apis/api-endpoint'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { apiClient } from '@/lib/api-client'

interface CreateCategoryParams extends NextFetchRequestConfig {
  name: string
  tag: string
  emoji: string
}

interface CreateCategoryResponse {
  id: number
}

export const createCategory = async (params: CreateCategoryParams) => {
  const session = await auth()

  return await apiClient.fetch<CreateCategoryResponse>({
    ...API_ENDPOINT.category.createCategory(),
    body: {
      name: params.name,
      tag: params.tag,
      emoji: params.emoji,
    },
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  })
}
