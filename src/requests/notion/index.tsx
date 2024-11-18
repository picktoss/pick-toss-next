/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'
import { Session } from 'next-auth'

export const fetchNotionAuth = async () => {
  const session = await auth()

  if (!session) {
    throw new Error('Session retrieval failed')
  }

  const response = await http.get(API_ENDPOINTS.NOTION.GET.AUTH, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  })

  if (response.status !== 200) {
    throw new Error('Authorization failed')
  }

  return session
}

export const fetchNotionCallback = async (session: Session) => {
  const { data } = await http.get<string>(API_ENDPOINTS.NOTION.GET.CALLBACK, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  })

  return data // Notion accessToken
}

export const fetchNotionPages = async ({
  notionAccessToken,
}: {
  notionAccessToken: string | null
}) => {
  try {
    const { data } = await http.get<Notion.Page[]>(API_ENDPOINTS.NOTION.GET.PAGES, {
      headers: {
        Authorization: `Bearer ${notionAccessToken}`,
      },
    })

    return data // notion pages
  } catch (error: any) {
    console.error(error.status)
    throw error
  }
}

export const fetchNotionSinglePage = async ({
  notionAccessToken,
}: {
  notionAccessToken: string | null
}) => {
  try {
    const { data } = await http.get<Notion.Page[]>(API_ENDPOINTS.NOTION.GET.PAGE, {
      headers: {
        Authorization: `Bearer ${notionAccessToken}`,
      },
    })

    return data // notion single page
  } catch (error: any) {
    console.error(error.status)
    throw error
  }
}
