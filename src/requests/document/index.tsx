/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'
import { Document } from '@/types/document'

export const fetchDocuments = async (
  directoryId: string | null,
  sortOption: 'CREATED_AT' | 'UPDATED_AT'
) => {
  try {
    const session = await auth()

    const { data } = await http.get<Document.List>(API_ENDPOINTS.DOCUMENT.GET.ALL, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      params: { 'directory-id': directoryId, 'sort-option': sortOption },
    })
    return data
  } catch (error: any) {
    console.error(error.status)
    throw error
  }
}
