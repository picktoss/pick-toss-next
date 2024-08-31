import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface ChangePointParams extends NextFetchRequestConfig {
  point: number
  accessToken: string
}

export const changePoint = async ({ point, accessToken }: ChangePointParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.test.changePoint(),
    body: {
      point,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
