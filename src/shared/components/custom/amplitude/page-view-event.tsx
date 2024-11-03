'use client'

import { useAmplitudeContext } from '@/shared/hooks/use-amplitude-context'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function PageViewEvent() {
  const pathname = usePathname()
  const { trackAmplitudeEvent } = useAmplitudeContext()

  useEffect(() => {
    trackAmplitudeEvent('pageView', {
      pathname,
    })
  }, [pathname, trackAmplitudeEvent])

  return null
}
