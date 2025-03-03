'use client'

import { useEffect, useState } from 'react'
import AppInstallAos from './app-install-aos'
import AppInstallIos from './app-install-ios'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'

const AppInstallView = () => {
  useDynamicThemeColor('#F5F7F9', '#FFFFFF')

  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOS)
  }, [])

  if (isIOS) {
    return <AppInstallIos />
  }

  return <AppInstallAos />
}

export default AppInstallView
