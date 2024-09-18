import { auth } from '@/app/api/auth/[...nextauth]/auth'

export const useUser = async () => {
  const session = await auth()
  const user = session?.user.dto

  return { user }
}
