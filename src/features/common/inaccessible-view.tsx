'use client'

import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import WebInstallView from '../view/web-install'

const InaccessibleView = () => {
  const { isMobile } = useScreenSize()
  const isPWA = useIsPWA()

  if (isMobile && !isPWA) {
    return <WebInstallView />
  }
}

export default InaccessibleView
