'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ChangePointParams extends NextFetchRequestConfig {
  point: number
}

export const changePoint = async ({ point }: ChangePointParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.test.changePoint(),
    body: {
      point,
    },
  })
}
