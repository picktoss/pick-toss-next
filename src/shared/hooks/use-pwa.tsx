import { useEffect, useState } from 'react'

export const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    // 더 안정적인 PWA 감지 방법
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (window.navigator as any).standalone === true

    setIsPWA(isStandalone)

    // 변경 감지를 위한 미디어 쿼리 추가
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleChange = (e: MediaQueryListEvent) => setIsPWA(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isPWA
}
// export const useIsPWA = () => {
//   const [isPWA, setIsPWA] = useState(false)

//   useEffect(() => {
//     const checkPWA = () => {
//       const isStandalone = window.matchMedia('(display-mode: standalone)').matches

//       setIsPWA(isStandalone)
//     }

//     checkPWA()

//     // Optional: Add an event listener for display mode changes
//     window.matchMedia('(display-mode: standalone)').addEventListener('change', checkPWA)

//     return () => {
//       window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkPWA)
//     }
//   }, [])

//   return isPWA
// }
