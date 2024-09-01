'use server'

import { apiClient } from '@/actions/api-client'
import { API_ENDPOINT } from '@/actions/endpoints'

interface UpdateQuizNotificationParams extends NextFetchRequestConfig {
  quizNotificationEnabled: boolean
}

export const updateQuizNotification = async ({
  quizNotificationEnabled,
}: UpdateQuizNotificationParams) => {
  return await apiClient.fetch({
    endpoint: API_ENDPOINT.user.updateQuizNotification(),
    body: {
      quizNotificationEnabled,
    },
  })
}
