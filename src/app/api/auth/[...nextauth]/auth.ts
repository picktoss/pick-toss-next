import NextAuth, { Account, DefaultSession, NextAuthResult } from 'next-auth'
import Kakao from 'next-auth/providers/kakao'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      account: Account
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
    jwt: ({ token, account }) => {
      /**
       * TODO: Backend API 호출 with account.access_token
       */
      token.account = account
      token.accessToken = 'backend api access token'

      /**
       * TODO: Backend API 호출 GET User
       */

      return token
    },

    session: ({ session, token }) => {
      session.user.id = token.sub || ''
      session.user.accessToken = token.accessToken as string
      session.user.account = token.account as Account

      return session
    },
  },
}) satisfies NextAuthResult
