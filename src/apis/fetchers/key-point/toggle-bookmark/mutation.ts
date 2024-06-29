'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toggleBookmark } from './fetcher'
import { GET_KEY_POINTS_BY_ID_KEY } from '../get-key-points-by-id/query'

interface Props {
  documentId?: number
}

interface Params {
  keyPointId: number
  bookmark: boolean
}

export function useToggleBookmarkMutation(props?: Props) {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ keyPointId, bookmark }: Params) =>
      toggleBookmark({
        accessToken: session?.user.accessToken || '',
        keypointId: keyPointId,
        bookmark,
      }),
    onSettled: async () => {
      if (props?.documentId != null) {
        await queryClient.refetchQueries({
          queryKey: [GET_KEY_POINTS_BY_ID_KEY, props.documentId],
          exact: true,
        })
      } else {
        await queryClient.refetchQueries({
          queryKey: [GET_KEY_POINTS_BY_ID_KEY],
        })
      }
    },
  })
}
