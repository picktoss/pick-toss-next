'use client'

import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useLayoutEffect } from 'react'

const StartView = () => {
  const { status } = useSession()
  const isPWA = useIsPWA()

  useLayoutEffect(() => {
    if (!isPWA) {
      window.location.href = 'https://picktoss.framer.website/'
    }
  }, [])

  if (status === 'loading') {
    return <Splash />
  }

  return <AppStartView />
}

export default StartView
