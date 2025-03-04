'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { createDocument } from './create-document'
import {
  deleteDocument,
  getDocumentDetail,
  moveDocument,
  postAddQuizzesInDocument,
  searchDocument,
} from './client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { updateDocument } from './update-document'
import { useUserInfo } from '../user/hooks'

/**
 * 문서 상세 조회 Hook
 */
export const useGetDocumentDetail = () => {
  return useMutation({
    mutationFn: async (documentId: number) => getDocumentDetail(documentId),
  })
}

/**
 * 문서 생성 Hook
 */
export const useCreateDocument = () => {
  const { data: session } = useSession()
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: (payload: Document.Request.CreateDocument) =>
      createDocument(payload, session?.user.accessToken || ''),
    onSuccess: () => {
      // 이용자 정보 갱신
      refetchUserInfo()
    },
  })
}

/**
 * 문서 수정 Hook
 */
export const useUpdateDocument = (documentId: number) => {
  const { data: session } = useSession()
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: (payload: { documentId: number; requestBody: Document.Request.UpdateContent }) =>
      updateDocument(payload.documentId, payload.requestBody, session?.user.accessToken || ''),
    onSuccess: async () => {
      // 문서 정보 갱신
      await queryClient.invalidateQueries(queries.document.list())
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
    mutationFn: async (payload: Document.Request.MoveDocument) => moveDocument(payload),
    onSuccess: async () => {
      // 문서 목록 갱신
      await queryClient.invalidateQueries(queries.directory.list())
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
      await queryClient.invalidateQueries(queries.directory.list())
      await queryClient.invalidateQueries(queries.document.list(listOption))
    },
  })
}

/**
 * 문서 검색 Hook
 */
export const useSearchDocument = () => {
  return useMutation({
    mutationFn: async (requestBody: Document.Request.SearchDocuments) =>
      searchDocument(requestBody),
  })
}

/**
 * 퀴즈 추가 생성 Hook
 */
export const useAddQuizzes = () => {
  const { mutate: refetchUserInfo } = useUserInfo()

  return useMutation({
    mutationFn: async ({
      documentId,
      requestBody,
    }: {
      documentId: number
      requestBody: { star: number; quizType: Quiz.Type }
    }) => postAddQuizzesInDocument(documentId, requestBody),
    onSuccess: () => {
      // 이용자 정보 갱신
      refetchUserInfo()
    },
  })
}
