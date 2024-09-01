'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createQuizzes } from '.'

export function useCreateQuizzesMutation() {
  const { update } = useSession()

  return useMutation({
    mutationFn: createQuizzes,
    onSuccess: () => update({}),
  })
}
