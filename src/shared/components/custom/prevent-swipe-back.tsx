'use client'

import { useEffect } from 'react'

const PreventSwipeBack = () => {
  useEffect(() => {
    let startX = 0
    let endX = 0

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0
    }

    const handleTouchMove = (event: TouchEvent) => {
      endX = event.touches[0]?.clientX ?? 0

      const targetElement = event.target as HTMLElement

      // 특정 클래스(.allow-swipe)가 포함된 요소에서는 기본 동작 허용
      if (targetElement.closest('.allow-swipe')) return

      // 오른쪽에서 왼쪽으로 스와이프 감지 (이전 페이지 이동 방지)
      if (startX - endX > 60) {
        event.preventDefault()
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}

export default PreventSwipeBack
