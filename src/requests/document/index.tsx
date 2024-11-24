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

export const updateDocument = async (
  documentId: number,
  requestBody: Document.Request.UpdateContent,
  accessToken: string
) => {
  try {
    const formData = new FormData()
    formData.append('name', requestBody.name)
    formData.append('file', requestBody.file)

    const response = await http.patch(
      API_ENDPOINTS.DOCUMENT.PATCH.UPDATE_CONTENT(documentId),
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
