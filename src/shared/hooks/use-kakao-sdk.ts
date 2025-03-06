import { useState, useEffect } from 'react'
import { loadKakaoSDK } from '../utils/kakao'

export const useKakaoSDK = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.Kakao?.isInitialized()) {
      setIsLoaded(true) // 이미 초기화된 경우, 상태 업데이트 후 종료
      return
    }

    loadKakaoSDK()
      .then(() => {
        setIsLoaded(true)
        // eslint-disable-next-line no-console
        console.log('✅ Kakao SDK 로드 완료')
      })
      .catch((err: Error) => {
        setError(err)
        console.error('❌ Kakao SDK 로드 실패:', err)
      })
  }, [])

  return { isLoaded, error }
}
