'use client'

import { useIsPWA } from '@/shared/hooks/use-pwa'
import { useScreenSize } from '@/shared/hooks/use-screen-size'
import AppStartView from './app-start'
import AppInstallView from './app-install'
import { Header } from '../landing/components/header'
import { Intro } from '../landing/components/intro'
import { Footer } from '../landing/components/footer'
import Splash from './splash'

const Landing = () => {
  const { isMobile, isDesktop } = useScreenSize()
  const isPWA = useIsPWA()

  if (isPWA) {
    return <AppStartView />
  }

  if (isMobile) {
    return <AppInstallView />
  }

  if (isDesktop) {
    // 랜딩 페이지
    return (
      <div className="relative z-20 h-dvh w-screen max-w-mobile">
        <Header />
        <Intro />
        <Footer />
      </div>
    )
  }

  return <Splash />
}

export default Landing
