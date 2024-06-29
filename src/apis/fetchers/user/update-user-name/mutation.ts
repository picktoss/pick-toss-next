'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateUserName } from './fetcher'

interface Params {
  name: string
}

export function useUpdateUsernameMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ name }: Params) =>
      updateUserName({
        accessToken: session?.user.accessToken || '',
        name,
      }),
    onSuccess: async () => await update({}),
  })
}
