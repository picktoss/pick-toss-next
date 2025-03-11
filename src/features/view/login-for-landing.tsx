'use client'

import { useSession } from 'next-auth/react'
import Splash from './splash'
import AppStartView from './app-start'

const LoginForLanding = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return <Splash />
  }

  return <AppStartView />
}

export default LoginForLanding
