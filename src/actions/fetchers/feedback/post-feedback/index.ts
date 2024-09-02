'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

import { FeedbackType } from '@/actions/types/dto/feedback.dto'

interface PostFeedbackParams extends NextFetchRequestConfig {
  content: string
  type: FeedbackType
}

export const postFeedback = async ({ content, type }: PostFeedbackParams) => {
  const result = await apiClient({
    endpoint: API_ENDPOINT.feedback.postFeedback(),
    data: {
      content,
      type,
    },
  })
  return result.data
}
