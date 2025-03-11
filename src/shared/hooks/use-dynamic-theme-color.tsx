'use client'

import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'

export const useDynamicThemeColor = (mountColor: string | null, unmountColor?: string | null) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')

    if (isMobile) {
      if (metaTag && mountColor) {
        metaTag.setAttribute('content', mountColor)
      }
    }

    return () => {
      if (metaTag && unmountColor) {
        metaTag.setAttribute('content', unmountColor)
      }
    }
  }, [mountColor, unmountColor])
}
