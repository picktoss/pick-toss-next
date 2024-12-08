'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { SessionProvider } from 'next-auth/react'
import { AmplitudeContextProvider } from '@/shared/hooks/use-amplitude-context'
import { AuthProvider } from '@/shared/provider/auth-provider'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <AmplitudeContextProvider>
      <SessionProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </AuthProvider>
      </SessionProvider>
    </AmplitudeContextProvider>
  )
}
