'use client'

import { useEffect, useState } from 'react'
import AppInstallAos from './app-install-aos'
import AppInstallIos from './app-install-ios'

const AppInstallView = () => {
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
