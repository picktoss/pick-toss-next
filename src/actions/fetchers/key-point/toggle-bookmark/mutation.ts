'use client'

import { useMutation } from '@tanstack/react-query'
import { toggleBookmark } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'

interface Props {
  documentId?: number
}

export function useToggleBookmarkMutation(props?: Props) {
  const queryClient = getQueryClient()

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
