'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (
  isMobile: boolean,
  mountColor: string | null,
  unmountColor?: string | null
) => {
  useEffect(() => {
    if (!isMobile) return

    const metaTag = document.querySelector('meta[name="theme-color"]')

    if (metaTag && mountColor) {
      metaTag.setAttribute('content', mountColor)
    }

    return () => {
      if (metaTag && unmountColor) {
        metaTag.setAttribute('content', unmountColor)
      }
    }
  }, [isMobile, mountColor, unmountColor])
}
