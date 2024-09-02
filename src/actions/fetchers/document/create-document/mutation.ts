'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { CreateDocumentParams, createDocument } from '.'

export function useCreateDocumentMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: (data: Omit<CreateDocumentParams, 'accessToken'>) =>
      createDocument({
        ...data,
        accessToken: session?.user.accessToken || '',
      }),
    onSuccess: () => update({}),
  })
}
