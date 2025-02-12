import { useMutation } from '@tanstack/react-query'
import { getInviteLink } from './client'

export const useInviteLink = () => {
  return useMutation({
    mutationFn: async () => getInviteLink(),
  })
}
