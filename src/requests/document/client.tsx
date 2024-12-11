'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

type GetDocumentsParams = {
  directoryId?: string
  sortOption?: Document.Sort
}

export const getDocuments = async (params?: GetDocumentsParams) => {
  const defaultSortOption = 'CREATED_AT'

  const DocsParams =
    params?.directoryId == null
      ? { 'sort-option': params?.sortOption ?? defaultSortOption }
      : {
          'directory-id': params.directoryId,
          'sort-option': params.sortOption ?? defaultSortOption,
        }

  try {
    const { data } = await http.get<{ documents: Document.List }>(API_ENDPOINTS.DOCUMENT.GET.ALL, {
      params: DocsParams,
    })
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

// document id page 컴포넌트에서도 사용됨 수정 필요
export const getDocumentDetail = async (documentId?: number) => {
  if (documentId === null || documentId === undefined) return

  try {
    const { data } = await http.get<Document.DetailItem>(
      API_ENDPOINTS.DOCUMENT.GET.BY_ID(documentId)
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const moveDocument = async (requestBody: Document.Request.MoveDocument) => {
  try {
    const response = await http.patch(API_ENDPOINTS.DOCUMENT.PATCH.MOVE, requestBody)

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

/** delete 메서드로 body를 받는 api입니다 (여러 문서 id를 리스트로 보냄) */
export const deleteDocument = async (requestBody: Document.Request.DeleteDocuments) => {
  try {
    const response = await http.delete(API_ENDPOINTS.DOCUMENT.DELETE.DOCUMENTS, {
      data: requestBody,
    })

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const searchDocument = async (requestBody: Document.Request.SearchDocuments) => {
  if (!requestBody.keyword || requestBody.keyword === '') return null

  try {
    const { data } = await http.post<Document.Response.SearchDocuments>(
      API_ENDPOINTS.DOCUMENT.POST.SEARCH,
      requestBody
    )

    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
