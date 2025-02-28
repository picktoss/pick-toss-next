import NextAuth, { Account, DefaultSession, NextAuthResult } from 'next-auth'
import Kakao from 'next-auth/providers/kakao'
import Google from 'next-auth/providers/google'
import { getUser } from '@/actions/fetchers/user/get-user'
import { UserDTO } from '@/actions/types/dto/user.dto'
import { signIn as signInApi } from '@/requests/auth/server'

declare module 'next-auth' {
  interface Account {
    params?: {
      state?: string
    }
  }

  interface Session {
    user: {
      id: string
      accessToken: string
      account: Account
      dto: UserDTO
      isNewUser: boolean // 첫 로그인 여부
      image?: string | null
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
  // debug: true,
  callbacks: {
    jwt: async ({ token, user, account, trigger }) => {
      if (account) {
        // `account.params.state`에서 `inviteCode` 추출
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const state = account.params?.state ? JSON.parse(account.params.state) : null
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const inviteCode = state?.inviteCode as string

        if (inviteCode) {
          token.inviteCode = inviteCode // inviteCode JWT에 저장
        }

        if (user) {
          token.picture = user.image ?? null
        }

        try {
          const { accessToken, accessTokenExpiration, signUp } = await signInApi(
            {
              socialPlatform: account.provider.toUpperCase() as 'GOOGLE' | 'KAKAO',
              accessToken: account.access_token as string,
            },
            inviteCode ? { 'invite-code': inviteCode } : undefined
          )

          token.account = account
          token.accessToken = accessToken
          token.accessTokenExpiration = accessTokenExpiration
          token.isNewUser = signUp
        } catch (error) {
          throw new Error('Failed to get backend access token')
        }
        // 회원가입 했을 때만 첫 사용자인지 알 수 있다
        try {
          // httpServer를 사용할 수 없음. 그 안에서 auth 를 통해 session을 호출하는데, 현 시점에서는 session이 없음
          const response = await fetch(process.env.NEXT_PUBLIC_DEV_API_URL + '/members/info', {
            headers: {
              Authorization: `Bearer ${token.accessToken as string}`,
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
            next: { revalidate: 0 },
          })
          // eslint-disable-next-line no-console
          console.warn(response)

          if (!response.ok) {
            throw new Error(`Failed to fetch user info: ${response.status}`)
          }

          const data = (await response.json()) as UserDTO

          token.userDTO = data
        } catch (error) {
          console.error('Error fetching user info:', error)
          throw new Error('Failed to get user')
        }
      }

      if (
        token.accessTokenExpiration &&
        Date.now() > new Date(token.accessTokenExpiration as string).getTime()
      ) {
        throw new Error('server token expired')
      }

      if (trigger === 'update') {
        try {
          const user = await getUser(token.accessToken as string)
          token.userDTO = user
        } catch (error) {
          throw new Error('Failed to get user')
        }
      }

      return token
    },

    session: ({ session, token }) => {
      session.user.id = token.sub || ''
      session.user.accessToken = token.accessToken as string
      session.user.dto = token.userDTO as UserDTO
      session.user.account = token.account as Account
      session.user.isNewUser = (token.isNewUser as boolean) ?? false
      session.user.image = token.picture ?? null

      return session
    },
  },
}) satisfies NextAuthResult
