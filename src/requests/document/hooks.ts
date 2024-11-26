'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from './create-document'
import { deleteDocument, moveDocument, updateDocument } from '.'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'

export const useCreateDocument = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: (payload: Document.Request.CreateDocument) =>
      createDocument(payload, session?.user.accessToken || ''),
  })
}

export const useUpdateDocument = (documentId: number) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: (params: { documentId: number; requestBody: Document.Request.UpdateContent }) =>
      updateDocument(params.documentId, params.requestBody),
    onSuccess: async () => {
      // 문서 정보 갱신
      await queryClient.invalidateQueries(queries.document.item(documentId))
    },
  })
}

/**
 * 문서 이동 Hook
 */
export const useMoveDocument = (listOption: {
  directoryId?: string
  sortOption: Document.Sort
}) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (requestBody: Document.Request.MoveDocument) => moveDocument(requestBody),
    onSuccess: async () => {
      // 문서 목록 갱신
      await queryClient.invalidateQueries(queries.document.list(listOption))
    },
  })
}

/**
 * 문서 삭제 Hook
 */
export const useDeleteDocument = (listOption: {
  directoryId?: string
  sortOption: Document.Sort
}) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (documentIds: number[]) => deleteDocument({ documentIds }),
    onSuccess: async () => {
      // 문서 목록 갱신
      await queryClient.invalidateQueries(queries.document.list(listOption))
    },
  })
}
