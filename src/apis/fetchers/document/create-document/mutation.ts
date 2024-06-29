'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from './fetcher'

interface Params {
  file: File
  documentName: string
  categoryId: number
}

export function useCreateDocumentMutation() {
  const { data: session, update } = useSession()

  return useMutation({
    mutationFn: ({ file, documentName, categoryId }: Params) =>
      createDocument({
        accessToken: session?.user.accessToken || '',
        file,
        documentName,
        categoryId,
      }),
    onSuccess: async () => await update({}),
  })
}
