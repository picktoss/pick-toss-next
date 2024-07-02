import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface ReCreateAiPickParams extends NextFetchRequestConfig {
  accessToken: string

  documentId: number
}

interface ReCreateAiPickResponse {}

export const reCreateAiPick = async (params: ReCreateAiPickParams) => {
  return await apiClient.fetch<ReCreateAiPickResponse>({
    ...API_ENDPOINT.document.rePostAiPick(params.documentId),
    headers: {
      Authorization: `Bearer ${params.accessToken}`,
    },
  })
}
