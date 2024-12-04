'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const getAllCollections = async () => {
  try {
    const session = await auth()

    const { data } = await http.get<Collection.Response.GetAllCollections>(
      API_ENDPOINTS.COLLECTION.GET.ALL,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export const getMyCollections = async () => {
  try {
    const session = await auth()

    const { data } = await http.get<Collection.Response.GetMyCollections>(
      API_ENDPOINTS.COLLECTION.GET.MY_COLLECTIONS,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export const getBookmarkedCollections = async () => {
  try {
    const session = await auth()

    const { data } = await http.get<Collection.Response.GetBookmarkedCollections>(
      API_ENDPOINTS.COLLECTION.GET.BOOKMARKED,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export const createCollection = async (payload: Collection.Request.CreateCollection) => {
  try {
    const session = await auth()

    const { data } = await http.post<Collection.Response.CreateCollection>(
      API_ENDPOINTS.COLLECTION.POST.CREATE_COLLECTION,
      payload,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

export const createBookmark = async (collectionId: number) => {
  try {
    const session = await auth()

    await http.post(
      API_ENDPOINTS.COLLECTION.POST.CREATE_BOOKMARK(collectionId),
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
  } catch (error) {
    throw error
  }
}

export const deleteBookmark = async (collectionId: number) => {
  try {
    const session = await auth()

    await http.delete(API_ENDPOINTS.COLLECTION.DELETE.BOOKMARK(collectionId), {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export const fetchCollectionInfo = async ({ collectionId }: { collectionId?: number }) => {
  if (collectionId === null || collectionId === undefined) return

  try {
    const session = await auth()

    const { data } = await http.get<Collection.Response.GetCollectionInfo>(
      API_ENDPOINTS.COLLECTION.GET.INFO(collectionId),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error) {
    throw error
  }
}
