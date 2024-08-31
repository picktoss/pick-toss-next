import { API_ENDPOINT } from '@/apis/api-endpoint'
import { FeedbackType } from '@/apis/types/dto/feedback.dto'
import { apiClient } from '@/shared/api-client'

interface PostFeedbackParams extends NextFetchRequestConfig {
  content: string
  type: FeedbackType
  accessToken: string
}

export const postFeedback = async ({ content, type, accessToken }: PostFeedbackParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.feedback.postFeedback(),
    body: {
      content,
      type,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
