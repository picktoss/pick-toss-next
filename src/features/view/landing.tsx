'use client'

import { useEffect, useState } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'
import { useRouter } from 'next/navigation'

// TODO: Splash 애니메이션 삽입 후 애니메이션 끝나면 AppStartView가 노출되도록
const Landing = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false) // 강제 리렌더링을 위한 state

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

  if (!session?.user) {
    return <AppStartView />
  }

  // default
  return <Splash />
}

export default Landing
