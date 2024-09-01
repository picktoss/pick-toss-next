'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from '.'

export function useCreateDocumentMutation() {
  const { update } = useSession()

  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => update({}),
  })
}
