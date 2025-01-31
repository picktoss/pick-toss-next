import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export const useInstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    }
  }, [])

  // const handleInstallClick = async () => {
  //   if (installPrompt) {
  //     await installPrompt.prompt()
  //     const result = await installPrompt.userChoice

  //     if (result.outcome === 'accepted') {
  //       // eslint-disable-next-line no-console
  //       console.log('앱 설치 승인')
  //     } else {
  //       // eslint-disable-next-line no-console
  //       console.log('앱 설치 거부')
  //     }

  //     setIsInstallable(false)
  //   }
  // }

  const handleInstallClick = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt()
        const result = await installPrompt.userChoice

        if (result.outcome === 'accepted') {
          // eslint-disable-next-line no-console
          console.log('앱 설치 승인')
        } else {
          // eslint-disable-next-line no-console
          console.log('앱 설치 거부')
        }

        setIsInstallable(false)
      } catch (error) {
        // 추가 폴백 메커니즘
        console.error('설치 중 오류 발생', error)

        // 안드로이드 대응
        if (/Android/i.test(navigator.userAgent)) {
          window.location.href =
            'intent:#Intent;action=android.intent.action.VIEW;' + `package=${getPackageName()};end`
        }
      }
    }
  }

  // 패키지명 동적 추출
  const getPackageName = () => {
    const manifest = document.querySelector('link[rel="manifest"]')
    return manifest ? new URL(manifest.getAttribute('href') || '').searchParams.get('package') : ''
  }

  return { isInstallable, handleInstallClick }
}
