/* eslint-disable no-console */
import { getToken as getMessagingToken } from 'firebase/messaging'
import { messaging } from '../../../firebase'

export const getToken = async (): Promise<string | null> => {
  const resolvedMessaging = await messaging

  if (!resolvedMessaging) {
    console.warn('FCM Messaging 지원되지 않음.')
    return null
  }

  try {
    const token = await getMessagingToken(resolvedMessaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
    if (token) {
      return token
    } else {
      console.warn('FCM 토큰 없음.')
      return null
    }
  } catch (error) {
    console.error('FCM 토큰 가져오기 오류:', error)
    return null
  }
}
