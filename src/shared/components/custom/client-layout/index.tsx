'use client'

import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useMemo(() => getQueryClient(), [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ClientLayout
