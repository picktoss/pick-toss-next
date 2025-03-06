import { useState, useEffect } from 'react'

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isDesktop: false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      // 모바일 기기 감지 (터치 기기 및 사용자 에이전트 확인)
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || 'ontouchstart' in window

      setScreenSize({
        width,
        height: window.innerHeight,
        isMobile: width <= 900 || isMobileDevice,
        isDesktop: width > 900 && !isMobileDevice,
      })
    }

    // 초기 크기 설정
    handleResize()

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize)

    // 클린업 함수
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}
