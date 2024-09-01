'use client'

import { useMutation } from '@tanstack/react-query'
import { reorderCategory } from '.'

export const useReorderCategoryMutation = () => {
  return useMutation({
    mutationFn: reorderCategory,
  })
}
