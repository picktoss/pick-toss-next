'use client'

import { useQuery } from '@tanstack/react-query'
import { getTopFive } from '.'

export const GET_TOP_FIVE_KEY = 'document-top-five'

export const useGetTopFiveQuery = () => {
  return useQuery({
    queryKey: [GET_TOP_FIVE_KEY],
    queryFn: () => getTopFive().then((res) => res.documents),
  })
}
