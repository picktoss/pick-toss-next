'use client'

import { useEffect } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'

// TODO: Splash 애니메이션 삽입 후 애니메이션 끝나면 AppStartView가 노출되도록
const Landing = () => {
  const { data: session } = useSession()

  // ipadOS용 route재설정
  useEffect(() => {
    if (session?.user) {
      window.location.href = '/main'
    }
  }, [session])

  if (!session) {
    return <Splash />
  }

  if (!session?.user) {
    return <AppStartView />
  }

  // default
  return <Splash />
}

export default Landing
