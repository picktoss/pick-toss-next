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

  alert(`환경 체크: iOS=${isIOS}, PWA=${isPWA}, Permission=${Notification.permission}`)

  try {
    // iOS PWA에서는 service worker 준비 상태 확인
    if (isIOS && isPWA) {
      alert('iOS PWA 환경 감지')
      const registration = await navigator.serviceWorker.ready
      alert('Service Worker Ready')

      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY',
      })

      alert('Subscription 성공')
      return true
    } else {
      // 다른 환경에서의 처리
      if (Notification.permission === 'default') {
        alert('권한 요청 시도')
        const permission = await Notification.requestPermission()
        alert(`권한 요청 결과: ${permission}`)
        return permission === 'granted'
      } else {
        alert(`이미 권한 설정됨: ${Notification.permission}`)
        return Notification.permission === 'granted'
      }
    }
  } catch (error) {
    alert(`권한 요청 실패: ${error as string}`)
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
