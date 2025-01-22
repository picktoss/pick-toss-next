'use client'

import { useServiceWorker } from '@/firebase/messaging/use-service-worker'
import { useEffect, useState } from 'react'
import { initializeFirebaseMessaging } from '../../../firebase'
import { useSession } from 'next-auth/react'
import { usePostFcmToken } from '@/requests/fcm/hooks'
import { getFCMToken } from '@/firebase/messaging/get-token'
import { useIsPWA } from './use-pwa'
import { requestNotificationPermission } from '../utils/notification'

// export const useMessaging = () => {
//   const { data: session } = useSession()
//   const { mutate: postFcmTokenMutate } = usePostFcmToken()
//   const isPWA = useIsPWA()

//   useServiceWorker()

//   useEffect(() => {
//     const isBrowser = typeof window !== 'undefined'
//     const isGranted = Notification.permission === 'granted'
//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

//     const setupMessaging = async () => {
//       alert(
//         `초기 상태: Browser=${isBrowser}, PWA=${isPWA}, iOS=${isIOS}, Permission=${Notification.permission}`
//       )

//       // 안드로이드 알림 권한 요청
//       if (Notification.permission === 'default' && isPWA && !isIOS) {
//         try {
//           await requestNotificationPermission()
//         } catch (error) {
//           console.error(error)
//         }
//       }

//       // 브라우저 환경에서만 실행, 세션이 있을 때만, 알림 허용 상태일 때만 실행
//       if (isBrowser && session?.user.accessToken && isGranted) {
//         try {
//           // alert('browser & session & granted')
//           const messaging = await initializeFirebaseMessaging()

//           if (messaging) {
//             // 토큰 발급
//             const token = await getFCMToken()

//             if (token && isPWA) {
//               // alert('fcm token: ' + token)

//               // 서버로 fcm 토큰 전송
//               postFcmTokenMutate(token)
//             }
//           }
//         } catch (error) {
//           // alert(error)
//           console.error('FCM setup error:', error)
//         }
//       }
//     }

//     void setupMessaging()
//   }, [session?.user.accessToken, postFcmTokenMutate, isPWA])
// }

export const useMessaging = () => {
  const { data: session } = useSession()
  const { mutate: postFcmTokenMutate } = usePostFcmToken()
  const isPWA = useIsPWA()
  const [isReadyNotification, setIsReadyNotification] = useState(false)

  useServiceWorker()

  useEffect(() => {
    const setupMessaging = async () => {
      try {
        const isBrowser = typeof window !== 'undefined'
        const isGranted = Notification.permission === 'granted'
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        if (!isBrowser) return

        // 안드로이드 알림 권한 요청
        if (Notification.permission === 'default' && isPWA && !isIOS) {
          try {
            await requestNotificationPermission()
          } catch (error) {
            console.error('Notification permission request failed:', error)
            return
          }
        }

        // 유저 세션 정보가 있고, 알림 허용 상태일 때만 진행
        if (!session?.user.accessToken || !isGranted) {
          return
        }

        const messaging = await initializeFirebaseMessaging()

        if (!messaging) {
          console.error('Failed to initialize Firebase messaging')
          return
        }

        // Get and process FCM token
        if (isPWA) {
          const token = await getFCMToken()
          if (token) {
            alert('fcm token: ' + token)
            postFcmTokenMutate(token)
          }
        }

        setIsReadyNotification(true)
      } catch (error) {
        console.error('Messaging setup failed:', error)
      }
    }

    void setupMessaging()
  }, [session?.user.accessToken, postFcmTokenMutate, isPWA])

  return { isReadyNotification }
}
