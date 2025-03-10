'use client'

import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import Splash from './splash'

const Landing = () => {
  const { status } = useSession()

  if (status === 'loading') {
    return <Splash />
  }

  return <AppStartView />
}

export default Landing
