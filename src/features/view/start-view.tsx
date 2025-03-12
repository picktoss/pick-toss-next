'use client'

import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useEffect } from 'react'

const StartView = () => {
  const { status } = useSession()
  const isPWA = useIsPWA()

  useEffect(() => {
    if (isPWA) return

    if (typeof window !== undefined) {
      if (!isPWA) {
        window.location.href = 'https://picktoss.framer.website/'
      }
    }
  }, [isPWA])

  if (status === 'loading') {
    return <Splash />
  }

  return <AppStartView />
}

export default StartView
