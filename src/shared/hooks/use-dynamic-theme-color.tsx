'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (color: string) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')
    if (metaTag) {
      metaTag.setAttribute('content', color)
    }

    return () => {
      if (metaTag) {
        metaTag.setAttribute('content', '#ffffff')
      }
    }
  }, [color])
}
