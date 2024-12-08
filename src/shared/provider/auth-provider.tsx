'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const AuthContext = createContext<string | null>(null)

/** 사용할 때 useToken */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    if (session?.user?.accessToken) {
      setAccessToken(session.user.accessToken)
    }
  }, [session])

  return <AuthContext.Provider value={accessToken}>{children}</AuthContext.Provider>
}

export const useToken = () => {
  const token = useContext(AuthContext)
  if (token === undefined) {
    throw new Error('useToken must be used within a AuthProvider')
  }
  return token
}
