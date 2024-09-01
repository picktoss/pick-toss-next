'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleBookmark } from '.'
import { GET_KEY_POINTS_BY_ID_KEY } from '../get-key-points-by-id/query'

interface Props {
  documentId?: number
}

export function useToggleBookmarkMutation(props?: Props) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleBookmark,
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
