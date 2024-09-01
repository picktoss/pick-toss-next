import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '.'

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: verifyEmail,
  })
}
