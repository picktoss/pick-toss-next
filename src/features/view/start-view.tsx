'use client'

import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useEffect, useState } from 'react'
import { checkPWAAppLaunched, setPWAAppLaunched } from '@/shared/utils/pwa'

const StartView = () => {
  const { status } = useSession()
  const [showSplash, setShowSplash] = useState(false)
  // const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    let hasRedirected = false

    // eslint-disable-next-line @typescript-eslint/require-await
    const detectPWA = async () => {
      if (typeof window === 'undefined') return false

      try {
        // PWA 상태 스토리지에서 먼저 확인
        const storedPWAStatus = checkPWAAppLaunched()

        if (storedPWAStatus) {
          return true
        }

        const isPWA = window.matchMedia('(display-mode: standalone)').matches

        // 세션 스토리지에 상태 저장
        if (isPWA) {
          setPWAAppLaunched(true)
          return true
        }

        return isPWA
      } catch (error) {
        console.error('PWA 감지 중 오류:', error)
        return false
      }
    }

    const handleRedirection = async () => {
      const isPWA = await detectPWA()
      if (isPWA) {
        setShowSplash(true)
        // setIsRedirecting(false)
        return
      }

      // // 리디렉션 시작 표시
      // setIsRedirecting(true)

      // 이미 리디렉션된 경우 중복 실행 방지
      if (hasRedirected) return
      hasRedirected = true

      // 약간의 지연 후 리디렉션 실행
      setTimeout(() => {
        if (isPWA) {
          window.location.href = '/login'
        } else {
          window.location.href = 'https://picktoss.framer.website/'
        }
      }, 100)
    }

    // 약간의 지연을 두고 감지 및 리디렉션 실행
    const timeoutId = setTimeout(async () => {
      await handleRedirection()
    }, 100)

    // // 리디렉션이 실패하는 경우를 대비해 타임아웃 설정
    // const failsafeTimeout = setTimeout(() => {
    //   setIsRedirecting(false)
    // }, 2000)

    return () => {
      clearTimeout(timeoutId)
      // clearTimeout(failsafeTimeout)
    }
  }, [])

  if (status === 'loading' || showSplash) {
    return <Splash />
  }

  return <AppStartView />
}

export default StartView
