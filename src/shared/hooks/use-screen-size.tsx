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

      setScreenSize({
        width,
        height: window.innerHeight,
        isMobile: width <= 768,
        isDesktop: width > 768,
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
