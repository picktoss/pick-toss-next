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
  try {
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
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    alert(`권한 요청 실패: ${error as any}`)
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
