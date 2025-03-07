import { useEffect, useState } from 'react'

export const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState(false)

  useEffect(() => {
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches

      setIsPWA(isStandalone)
    }

    checkPWA()

    // Optional: Add an event listener for display mode changes
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkPWA)

    return () => {
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkPWA)
    }
  }, [])

  return isPWA
}
