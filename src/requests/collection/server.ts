'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

/** server에서만 사용 */
export const getBookmarkedCollections = async () => {
  try {
    const { data } = await httpServer.get<Collection.Response.GetBookmarkedCollections>(
      API_ENDPOINTS.COLLECTION.GET.BOOKMARKED
    )
    return data
  } catch (error) {
    throw error
  }
}
