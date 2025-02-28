'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (mountColor: string, unmountColor: string) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')
    if (metaTag) {
      metaTag.setAttribute('content', mountColor)
    }

    return () => {
      if (metaTag) {
        metaTag.setAttribute('content', unmountColor)
      }
    }
  }, [mountColor, unmountColor])
}
