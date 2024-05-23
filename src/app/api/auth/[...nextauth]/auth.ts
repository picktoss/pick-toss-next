import NextAuth, { Account, DefaultSession, NextAuthResult } from 'next-auth'
import { signIn as signInAPI } from '@/apis/fetchers/auth/sign-in'
import Kakao from 'next-auth/providers/kakao'
import Google from 'next-auth/providers/google'
import { getUser } from '@/apis/fetchers/user/get-user'
import { UserDTO } from '@/apis/types/dto/user.dto'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      account: Account
      dto: UserDTO
    } & DefaultSession['user']
  }
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  providers: [Kakao, Google],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        try {
          const { accessToken } = await signInAPI({
            socialPlatform: account.provider.toUpperCase() as 'GOOGLE' | 'KAKAO',
            accessToken: account.access_token as string,
          })
          token.account = account
          token.accessToken = accessToken
        } catch (error) {
          throw new Error('Failed to get backend access token')
        }
      }

      try {
        const user = await getUser({
          accessToken: token.accessToken as string,
        })
        token.userDTO = user
      } catch (error) {
        throw new Error('Failed to get user')
      }

      return token
    },

    session: ({ session, token }) => {
      session.user.id = token.sub || ''
      session.user.accessToken = token.accessToken as string
      session.user.dto = token.userDTO as UserDTO
      session.user.account = token.account as Account

      return session
    },
  },
}) satisfies NextAuthResult
