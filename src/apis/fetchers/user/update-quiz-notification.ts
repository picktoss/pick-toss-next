import { API_ENDPOINT } from '@/apis/api-endpoint'
import { apiClient } from '@/lib/api-client'

interface UpdateQuizNotificationParams {
  accessToken: string
  quizNotificationEnabled: boolean
}

export const updateQuizNotification = async ({
  accessToken,
  quizNotificationEnabled,
}: UpdateQuizNotificationParams) => {
  return await apiClient.fetch({
    ...API_ENDPOINT.user.updateQuizNotification(),
    body: {
      quizNotificationEnabled,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
