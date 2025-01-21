/** 알림 권한 허용 체크 */
export const checkNotificationPermission = () => {
  // 이미 권한 선택을 한 경우
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return true
  }

  return false
}

/** 알림 권한 요청 함수 */
export const requestNotificationPermission = async () => {
  // iOS 체크
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isPWA = window.matchMedia('(display-mode: standalone)').matches

  // eslint-disable-next-line no-console
  console.log('Environment check:', {
    isIOS,
    isPWA,
    permission: Notification.permission,
    serviceWorker: 'serviceWorker' in navigator,
  })

  // PWA 환경이 아니거나 이미 권한이 결정된 경우
  if (!isPWA || Notification.permission !== 'default') {
    return false
  }

  try {
    // Service Worker 등록 확인
    const registration = await navigator.serviceWorker.ready

    // iOS에서는 푸시 매니저를 통해 권한 요청
    if (isIOS) {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY',
      })

      // eslint-disable-next-line no-console
      console.log('Push subscription successful:', subscription)
      return true
    } else {
      // 다른 환경에서는 일반적인 방식으로 권한 요청
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
  } catch (error) {
    console.error('알림 권한 요청 실패:', error)
    return false
  }
}
// export const requestNotificationPermission = async () => {
//   const isCheckPermission = checkNotificationPermission()

//   if (!isCheckPermission) {
//     try {
//       const permission = await Notification.requestPermission()
//       if (permission === 'granted') {
//         // eslint-disable-next-line no-console
//         console.log('알림 권한이 승인되었습니다.')
//         alert('알림 권한이 승인되었습니다.')
//       } else {
//         // eslint-disable-next-line no-console
//         console.log('알림 권한이 거부되었습니다.')
//         alert('알림 권한이 거부되었습니다.')
//       }
//     } catch (error) {
//       console.error('알림 권한 요청 중 에러:', error)
//       alert(error)
//     }
//   } else {
//     // eslint-disable-next-line no-console
//     console.log('알림 권한 상태:', Notification.permission)
//     alert('알림 권한 상태: ' + Notification.permission)
//   }
// }
