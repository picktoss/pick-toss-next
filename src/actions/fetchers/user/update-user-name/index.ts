'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateUserNameParams extends NextFetchRequestConfig {
  name: string
}

export const updateUserName = async ({ name }: UpdateUserNameParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.user.updateUserName(),
    body: {
      name,
    },
  })
}
