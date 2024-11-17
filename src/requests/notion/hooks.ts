/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { fetchNotionAuth, fetchNotionCallback, fetchNotionPages } from '.'
import { useState } from 'react'
import { convertPagesToMarkdownFile } from '@/shared/utils/convert'

export const useNotionAuthMutation = () => {
  const [notionAccessToken, setNotionAccessToken] = useState<string | null>(null)

  const authMutation = useMutation<Session>({
    mutationFn: fetchNotionAuth,
    onSuccess: async (session: Session) => {
      try {
        const notionAccessToken = await fetchNotionCallback(session)
        // eslint-disable-next-line no-console
        // console.log('Notion Access Token:', notionAccessToken)
        setNotionAccessToken(notionAccessToken)
      } catch (error: any) {
        console.error('Error in fetchNotionCallback:', error)
      }
    },
    onError: (error: any) => {
      console.error('Error in fetchNotionAuth:', error)
    },
  })

  return { notionAccessToken, ...authMutation }
}

export const useGetNotionPages = (notionAccessToken: string | null) => {
  return useQuery({
    queryKey: ['getNotionPages', notionAccessToken],
    queryFn: async () => fetchNotionPages({ notionAccessToken }),
    enabled: !notionAccessToken,
  })
}

export const useGetNotionMdFile = (notionAccessToken: string, pageIds: string[]) => {
  return useQuery({
    queryKey: ['getNotionPages', notionAccessToken, pageIds],
    queryFn: async () => convertPagesToMarkdownFile(notionAccessToken, pageIds),
    enabled: !notionAccessToken,
  })
}
