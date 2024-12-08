'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

export const postFcmToken = async (requestBody: { fcmToken: string }) => {
  try {
    const session = await auth()

    const response = await httpServer.post(API_ENDPOINTS.FCM.POST.TOKEN, requestBody, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error) {
    console.error(error)
    throw error
  }
}
