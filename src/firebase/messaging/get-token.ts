import { getToken as getMessagingToken } from 'firebase/messaging'
import { initializeFirebaseMessaging } from '../../../firebase'

export const getFCMToken = async (): Promise<string | null> => {
  const messaging = await initializeFirebaseMessaging()

  if (messaging) {
    try {
      const token = await getMessagingToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
      if (token) {
        return token
      } else {
        // eslint-disable-next-line no-console
        console.warn('FCM 토큰 없음.')
        return null
      }
    } catch (error) {
      console.error('FCM 토큰 가져오기 오류:', error)
      return null
    }
  } else return null
}
