import { useLayoutEffect, useRef } from 'react'

interface UseScrollPositionProps {
  /**
   * 페이지나 컴포넌트의 고유 식별자
   * 여러 페이지의 스크롤 위치를 각각 저장하기 위해 사용
   */
  pageKey: string
}

export const useScrollPosition = ({ pageKey }: UseScrollPositionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    // 페이지 언마운트 시 스크롤 위치 저장
    const handleBeforeUnload = () => {
      if (scrollContainerRef.current) {
        sessionStorage.setItem(`${pageKey}-scroll`, scrollContainerRef.current.scrollTop.toString())
      }
    }

    return () => {
      handleBeforeUnload()
    }
  }, [pageKey])

  // 페이지 마운트 시 스크롤 위치 복원
  useLayoutEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(`${pageKey}-scroll`)
    if (savedScrollPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedScrollPosition)
    }
  }, [pageKey])

  return scrollContainerRef
}
