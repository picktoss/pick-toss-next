import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from './create-document'

export const useCreateDocument = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (payload: Document.Request.CreateDocument) =>
      createDocument(payload, session?.user.accessToken || ''),
  })
}
