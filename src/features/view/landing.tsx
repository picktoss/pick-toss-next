'use client'

import { useEffect } from 'react'
import AppStartView from './app-start'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// import Splash from './splash'

// TODO: Splash 애니메이션 삽입 후 애니메이션 끝나면 AppStartView가 노출되도록
const Landing = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      router.replace('/main')
    }
  }, [router, session])

  return <AppStartView />

  // return <Splash />
}

export default Landing
