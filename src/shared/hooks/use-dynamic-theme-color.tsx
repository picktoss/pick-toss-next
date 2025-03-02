'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (mountColor: string | null, unmountColor = '#ffffff') => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')

    if (metaTag && mountColor) {
      metaTag.setAttribute('content', mountColor)
    }

    return () => {
      if (metaTag) {
        metaTag.setAttribute('content', unmountColor)
      }
    }
  }, [mountColor, unmountColor])
}
