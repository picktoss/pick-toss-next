'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

interface GetDocumentsParams {
  directoryId?: string
  sortOption?: Document.Sort
}

export const fetchDocuments = async (params?: GetDocumentsParams) => {
  const defaultSortOption = 'CREATED_AT'

  const DocsParams =
    params?.directoryId == null
      ? { 'sort-option': params?.sortOption ?? defaultSortOption }
      : {
          'directory-id': params.directoryId,
          'sort-option': params.sortOption ?? defaultSortOption,
        }

  try {
    const session = await auth()

    const { data } = await http.get<{ documents: Document.List }>(API_ENDPOINTS.DOCUMENT.GET.ALL, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      params: DocsParams,
    })
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const fetchDocumentDetail = async (documentId: number) => {
  try {
    const session = await auth()

    const { data } = await http.get<Document.DetailItem>(
      API_ENDPOINTS.DOCUMENT.GET.BY_ID(documentId),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const moveDocument = async (requestBody: Document.Request.MoveDocument) => {
  try {
    const session = await auth()

    const response = await http.patch(API_ENDPOINTS.DOCUMENT.PATCH.MOVE, requestBody, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const deleteDocument = async (requestBody: Document.Request.DeleteDocuments) => {
  try {
    const session = await auth()

    // delete 메서드로 body를 받는 api입니다 (여러 문서 id를 리스트로 보냄)
    const response = await http.delete(API_ENDPOINTS.DOCUMENT.DELETE.DOCUMENTS, {
      data: requestBody,
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error) {
    console.error(error)
    throw error
  }
}
