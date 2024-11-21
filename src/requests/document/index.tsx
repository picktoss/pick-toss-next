'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const fetchDocuments = async (params?: {
  directoryId?: string
  sortOption?: Document.Sort
}) => {
  const defaultSortOption = 'CREATED_AT'

  const DocsParams =
    params?.directoryId == null
      ? { 'sort-option': params?.sortOption || defaultSortOption }
      : { 'directory-id': params.directoryId, 'sort-option': params.sortOption }

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

    const { data } = await http.get<Document.Item>(API_ENDPOINTS.DOCUMENT.GET.BY_ID(documentId), {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
