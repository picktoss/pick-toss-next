'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const postFcmToken = async (
  accessToken: string | undefined,
  requestBody: { fcmToken: string }
) => {
  try {
    await http.post(API_ENDPOINTS.FCM.POST.TOKEN, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
