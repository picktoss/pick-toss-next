import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/shared/api-client'

interface CreateAiPickParams extends NextFetchRequestConfig {
  accessToken: string

  documentId: number
}

interface CreateAiPickResponse {
  firstUseAiPick: boolean
}

export const createAiPick = async (params: CreateAiPickParams) => {
  return await apiClient.fetch<CreateAiPickResponse>({
    ...API_ENDPOINT.document.postAiPick(params.documentId),
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
