'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAuthStore } from '@/store/auth'

/** 사용할 때 useAuthStore에서 접근 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const setAccessToken = useAuthStore.getState().setAccessToken

  useEffect(() => {
    if (session?.user?.accessToken) {
      setAccessToken(session.user.accessToken)
    } else {
      setAccessToken(null)
    }
  }, [session, setAccessToken])

  return <>{children}</>
}
