'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (mountColor: string | null, unmountColor?: string | null) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')

    if (metaTag && mountColor) {
      metaTag.setAttribute('content', mountColor)
    }

    return () => {
      if (metaTag && unmountColor) {
        metaTag.setAttribute('content', unmountColor)
      }
    }
  }, [mountColor, unmountColor])
}
