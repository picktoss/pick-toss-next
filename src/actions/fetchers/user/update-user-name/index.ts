'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateUserNameParams extends NextFetchRequestConfig {
  name: string
}

export const updateUserName = async ({ name }: UpdateUserNameParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.user.updateUserName(),
    data: {
      name,
    },
  })
  return result.data
}
