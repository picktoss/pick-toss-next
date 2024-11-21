'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { updateUserName } from '.'

export function useUpdateUsernameMutation() {
  const { update } = useSession()

  return useMutation({
    mutationFn: updateUserName,
    onSuccess: async () => await update({}),
  })
}
