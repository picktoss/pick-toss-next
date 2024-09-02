'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface ChangeAiPickParams extends NextFetchRequestConfig {
  aiPickCount: number
}

export const changeAiPick = async ({ aiPickCount }: ChangeAiPickParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.test.changeAiPick(),
    data: {
      aiPickCount,
    },
  })
  return result.data
}
