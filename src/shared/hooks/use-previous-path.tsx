// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

const PREVIOUS_PATH_KEY = 'previousPath'

const usePreviousPath = (isCustom?: boolean) => {
  const pathname = usePathname()

  // 이전 경로 가져오기
  const getPreviousPath = useCallback(() => {
    return sessionStorage.getItem(PREVIOUS_PATH_KEY)
  }, [])

  // 특정 시점의 경로가 필요할 경우
  const setPreviousPath = useCallback(() => {
    return sessionStorage.setItem(PREVIOUS_PATH_KEY, pathname)
  }, [])

  // 현재 경로를 sessionStorage에 저장
  useEffect(() => {
    if (pathname && !isCustom) {
      sessionStorage.setItem(PREVIOUS_PATH_KEY, pathname)
    }
  }, [pathname, isCustom])

  return { getPreviousPath, setPreviousPath }
}

export default usePreviousPath
