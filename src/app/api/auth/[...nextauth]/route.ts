import type { Account, DefaultSession } from 'next-auth'
import NextAuth from 'next-auth/next'
import KakaoProvider from 'next-auth/providers/kakao'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      accessToken: string
      account: Account
    } & DefaultSession['user']
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    jwt: ({ token, account }) => {
      /**
       * TODO: Backend API 호출 with account.access_token
       */
      token.accessToken = 'backend api access token'
      token.account = account

      return token
    },

    session: ({ session, token }) => {
      if (token && token.sub) {
        session.user.id = token.sub
        session.user.accessToken = token.accessToken as string
        session.user.account = token.account as Account
      }

      return session
    },
  },
})

export { handler as GET, handler as POST }
