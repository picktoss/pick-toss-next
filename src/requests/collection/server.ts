'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

export const getCollectionInfo = async (id: number) => {
  try {
    const { data } = await httpServer.get<Collection.ItemWithQuizzes>(
      API_ENDPOINTS.COLLECTION.GET.INFO(id)
    )
    return data
  } catch (error) {
    throw error
  }
}

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

export const getMyCollections = async () => {
  try {
    const { data } = await httpServer.get<Collection.Response.GetMyCollections>(
      API_ENDPOINTS.COLLECTION.GET.MY_COLLECTIONS
    )
    return data
  } catch (error) {
    throw error
  }
}
