'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface CreateAiPickParams extends NextFetchRequestConfig {
  documentId: number
}

interface CreateAiPickResponse {
  firstUseAiPick: boolean
}

export const createAiPick = async (params: CreateAiPickParams) => {
  return await apiClient.fetch<CreateAiPickResponse>({
    endpoint: API_ENDPOINT.document.postAiPick(params.documentId),
  })
}
