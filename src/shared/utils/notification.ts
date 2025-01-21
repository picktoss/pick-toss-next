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
  const isCheckPermission = checkNotificationPermission()

  if (!isCheckPermission) {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        // eslint-disable-next-line no-console
        console.log('알림 권한이 승인되었습니다.')
        alert('알림 권한이 승인되었습니다.')
      } else {
        // eslint-disable-next-line no-console
        console.log('알림 권한이 거부되었습니다.')
        alert('알림 권한이 거부되었습니다.')
      }
    } catch (error) {
      console.error('알림 권한 요청 중 에러:', error)
      alert(error)
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('알림 권한 상태:', Notification.permission)
    alert('알림 권한 상태: ' + Notification.permission)
  }
}
