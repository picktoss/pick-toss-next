'use client'

import { useEffect } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'

// TODO: Splash 애니메이션 삽입 후 애니메이션 끝나면 AppStartView가 노출되도록
const Landing = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      window.location.href = '/main'
    }
  }, [session])

  if (!session?.user) {
    return <AppStartView />
  }

  return <Splash />
}

export default Landing
