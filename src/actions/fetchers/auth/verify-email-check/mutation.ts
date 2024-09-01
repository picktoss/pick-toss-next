import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { verifyEmailCheck } from '.'

export const useVerifyEmailCheckMutation = () => {
  const { update } = useSession()

  return useMutation({
    mutationFn: verifyEmailCheck,
    onSuccess: async () => await update({}),
  })
}
