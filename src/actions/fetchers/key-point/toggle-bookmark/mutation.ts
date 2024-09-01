'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleBookmark } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

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
          queryKey: queries.keyPoints.item(props.documentId).queryKey,
          exact: true,
        })
      } else {
        await queryClient.refetchQueries({
          queryKey: queries.keyPoints.item._def,
        })
      }
    },
  })
}
