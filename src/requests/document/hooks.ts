import { useMutation } from '@tanstack/react-query'
import { createDocument } from './index'

export const useCreateDocument = () => {
  return useMutation({
    mutationFn: createDocument,
  })
}
