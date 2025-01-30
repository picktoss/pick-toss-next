'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/** GET /notifications - 모든 알림 가져오기 */
export const getAllNotifications = async () => {
  try {
    const { data } = await http.get<Notification.Response.GetAllNotifications>(
      API_ENDPOINTS.NOTIFICATION.GET.ALL
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}
