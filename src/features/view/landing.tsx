'use client'

import { useEffect, useState } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useRouter } from 'next/navigation'

const Landing = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false) // 강제 리렌더링을 위한 state

  useEffect(() => {
    if (!session?.user) {
      window.focus() // iOS에서 세션 감지를 트리거
    }
  }, [])

  // ipadOS용 route재설정
  useEffect(() => {
    if (session?.user) {
      setIsReady(true) // 상태 변경
    }
  }, [session?.user])

  useEffect(() => {
    if (isReady) {
      router.replace('/main')
    }
  }, [isReady])

  if (status === 'loading') {
    return <Splash />
  }

  if (!isReady && !session?.user) {
    return <AppStartView />
  }
}

export default Landing
