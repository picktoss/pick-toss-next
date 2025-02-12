'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const getAllCollections = async (props?: {
  collectionSortOption: 'POPULARITY' | 'UPDATED'
  collectionCategories: Collection.Field[]
  quizType?: 'MIX_UP' | 'MULTIPLE_CHOICE'
  quizCount: number
}) => {
  try {
    const { data } = await http.get<Collection.Response.GetAllCollections>(
      API_ENDPOINTS.COLLECTION.GET.ALL(props)
    )
    return data
  } catch (error) {
    throw error
  }
}

export const getMyCollections = async () => {
  try {
    const { data } = await http.get<Collection.Response.GetMyCollections>(
      API_ENDPOINTS.COLLECTION.GET.MY_COLLECTIONS
    )
    return data
  } catch (error) {
    throw error
  }
}

/** client에서만 사용 */
export const getBookmarkedCollections = async () => {
  try {
    const { data } = await http.get<Collection.Response.GetBookmarkedCollections>(
      API_ENDPOINTS.COLLECTION.GET.BOOKMARKED
    )
    return data
  } catch (error) {
    throw error
  }
}

export const createCollection = async (payload: Collection.Request.CreateCollection) => {
  try {
    const { data } = await http.post<Collection.Response.CreateCollection>(
      API_ENDPOINTS.COLLECTION.POST.CREATE_COLLECTION,
      payload
    )
    return data
  } catch (error) {
    throw error
  }
}

export const createBookmark = async (collectionId: number) => {
  try {
    await http.post(API_ENDPOINTS.COLLECTION.POST.CREATE_BOOKMARK(collectionId))
  } catch (error) {
    throw error
  }
}

export const deleteBookmark = async (collectionId: number) => {
  try {
    await http.delete(API_ENDPOINTS.COLLECTION.DELETE.BOOKMARK(collectionId))
  } catch (error) {
    throw error
  }
}

export const getCollectionInfo = async ({ collectionId }: { collectionId: number }) => {
  try {
    const { data } = await http.get<Collection.Response.GetCollectionInfo>(
      API_ENDPOINTS.COLLECTION.GET.INFO(collectionId)
    )
    return data
  } catch (error) {
    throw error
  }
}

export const getRandomCollectionQuizzes = async ({ categoryId }: { categoryId: string }) => {
  try {
    const { data } = await http.get<Collection.Response.GetRandomCollectionQuizzes>(
      API_ENDPOINTS.COLLECTION.GET.RANDOM_QUIZZES(categoryId)
    )
    return data
  } catch (error) {
    throw error
  }
}

export const deleteCollection = async (collectionId: number) => {
  try {
    await http.delete(API_ENDPOINTS.COLLECTION.DELETE.COLLECTION(collectionId))
  } catch (error) {
    throw error
  }
}

export const updateCollectionInfo = async ({
  collectionId,
  payload,
}: {
  collectionId: number
  payload: Collection.Request.UpdateInfo
}) => {
  try {
    await http.patch(API_ENDPOINTS.COLLECTION.PATCH.UPDATE_INFO(collectionId), payload)
  } catch (error) {
    throw error
  }
}

export const updateCollectionQuizzes = async ({
  collectionId,
  payload,
}: {
  collectionId: number
  payload: Collection.Request.UpdateQuizzes
}) => {
  try {
    await http.patch(API_ENDPOINTS.COLLECTION.PATCH.UPDATE_QUIZZES(collectionId), payload)
  } catch (error) {
    throw error
  }
}

export const searchCollections = async (keyword: string) => {
  try {
    const { data } = await http.get<Collection.Response.GetCollectionsByKeyword>(
      API_ENDPOINTS.COLLECTION.GET.BY_KEYWORD(keyword)
    )
    return data
  } catch (error) {
    throw error
  }
}

export const interestedCategoryCollections = async () => {
  try {
    const { data } = await http.get<Collection.Response.GetInterestCategoryCollections>(
      API_ENDPOINTS.COLLECTION.GET.INTEREST_CATEGORY
    )
    return data
  } catch (error) {
    throw error
  }
}
