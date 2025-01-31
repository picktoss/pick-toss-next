/** 알림 권한 허용 체크 */
export const checkNotificationPermission = () => {
  // 이미 권한 선택을 한 경우
  if (Notification.permission === 'granted' || Notification.permission === 'denied') {
    return true
  }

  return false
}

/** 안드로이드용 알림 권한 요청 함수 */
export const requestNotificationPermission = async () => {
  try {
    // 다른 환경에서의 처리
    if (Notification.permission === 'default') {
      // eslint-disable-next-line no-console
      console.log('권한 요청 시도')

      const permission = await Notification.requestPermission()
      // eslint-disable-next-line no-console
      console.log(`권한 요청 결과: ${permission}`)
      return permission === 'granted'
    } else {
      // eslint-disable-next-line no-console
      console.log(`이미 권한 설정됨: ${Notification.permission}`)
      return Notification.permission === 'granted'
    }
    // }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(`권한 요청 실패: ${error as any}`)
    return false
  }
}
