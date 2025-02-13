import { useState, useEffect } from 'react'
import { loadKakaoSDK } from '../utils/kakao'

export const useKakaoSDK = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    loadKakaoSDK()
      .then(() => setIsLoaded(true))
      .catch((err: Error) => setError(err))
  }, [])

  return { isLoaded, error }
}
