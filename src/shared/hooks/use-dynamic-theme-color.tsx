'use client'

import { useEffect } from 'react'

export const useDynamicThemeColor = (
  mountColor: string | null,
  unmountColor: string | null,
  condition?: boolean,
  prevColor?: string
) => {
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]')
    const initialColor = prevColor ?? metaTag?.getAttribute('content') ?? '#ffffff'

    if (condition === undefined) {
      if (metaTag && mountColor) {
        metaTag.setAttribute('content', mountColor)
      }

      return () => {
        if (metaTag) {
          if (unmountColor) {
            metaTag.setAttribute('content', unmountColor)
            return
          }
          if (prevColor) {
            metaTag.setAttribute('content', prevColor)
          }
        }
      }
    } else {
      if (metaTag) {
        metaTag.setAttribute(
          'content',
          condition ? mountColor ?? initialColor : unmountColor ?? initialColor
        )
      }

      return () => {
        if (metaTag) {
          // Drawer가 닫힐 때(prevColor가 있으면 원래 색상으로 복원)
          metaTag.setAttribute('content', unmountColor ?? initialColor)
        }
      }
    }
  }, [mountColor, unmountColor, condition, prevColor])
}
// export const useDynamicThemeColor = (mountColor: string, unmountColor: string) => {
//   useEffect(() => {
//     const metaTag = document.querySelector('meta[name="theme-color"]')
//     if (metaTag) {
//       metaTag.setAttribute('content', mountColor)
//     }

//     return () => {
//       if (metaTag) {
//         metaTag.setAttribute('content', unmountColor)
//       }
//     }
//   }, [mountColor, unmountColor])
// }
