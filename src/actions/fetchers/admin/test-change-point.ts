'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ChangePointParams extends NextFetchRequestConfig {
  point: number
}

export const changePoint = async ({ point }: ChangePointParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.test.changePoint(),
    data: {
      point,
    },
  })
  return result.data
}
