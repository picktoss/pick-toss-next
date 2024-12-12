import { useEffect, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const PREVIOUS_PATH_KEY = 'previousPath'

interface UsePreviousPath {
  getPreviousPath: () => string | null
  setPreviousPath: (customPath: string) => void
}

const usePreviousPath = ({ getCustomPath } = { getCustomPath: false }): UsePreviousPath => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 이전 경로 가져오기
  const getPreviousPath = useCallback((): string | null => {
    return sessionStorage.getItem(PREVIOUS_PATH_KEY)
  }, [])

  // 특정 시점의 경로 설정이 필요할 경우
  const setPreviousPath = useCallback((customPath: string): void => {
    return sessionStorage.setItem(PREVIOUS_PATH_KEY, customPath)
  }, [])

  // unmount시 현재 경로를 sessionStorage에 저장
  useEffect(() => {
    const setPreviousPath = () => {
      if (pathname && !getCustomPath) {
        const fullPath = searchParams?.toString()
          ? `${pathname}?${searchParams.toString()}`
          : pathname
        sessionStorage.setItem(PREVIOUS_PATH_KEY, fullPath)
      }
    }

    return () => setPreviousPath()
  }, [pathname, getCustomPath, searchParams])

  return { getPreviousPath, setPreviousPath }
}

export default usePreviousPath
