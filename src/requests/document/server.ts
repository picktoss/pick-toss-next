'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

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
    const { data } = await httpServer.get<{ documents: Document.List }>(
      API_ENDPOINTS.DOCUMENT.GET.ALL,
      {
        params: DocsParams,
      }
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getDocumentDetail = async (documentId?: number) => {
  if (documentId == null) return

  try {
    const { data } = await httpServer.get<Document.DetailItem>(
      API_ENDPOINTS.DOCUMENT.GET.BY_ID(documentId)
    )
    return data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
