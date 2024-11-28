'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

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
