'use client'

import { useIsPWA } from '@/shared/hooks/use-pwa'
import { isMobile } from 'react-device-detect'
import WebInstallView from '../view/web-install'

const InaccessibleView = () => {
  const isPWA = useIsPWA()

  if (isMobile && !isPWA) {
    return <WebInstallView />
  }
}

export default InaccessibleView
