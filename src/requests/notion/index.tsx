/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const fetchNotionAuth = async () => {
  try {
    const session = await auth()

    void http.get(API_ENDPOINTS.NOTION.GET.AUTH, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: any) {
    console.error(error.status)
    throw error
  }
}

export const fetchNotionCallback = async () => {
  try {
    const session = await auth()

    const { data } = await http.get<string>(API_ENDPOINTS.NOTION.GET.CALLBACK, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    return data // notion accessToken
  } catch (error: any) {
    console.error(error.status)
    throw error
  }
}

export const fetchNotionPages = async ({ notionAccessToken }: { notionAccessToken: string }) => {
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
  notionAccessToken: string
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
