import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface UpdateUserNameParams {
  accessToken: string
  name: string
}

export const updateUserName = async ({ accessToken, name }: UpdateUserNameParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.user.updateUserName(),
    body: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
