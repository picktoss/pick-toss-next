'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const fetchUserInfo = async () => {
  const session = await auth()

  try {
    const { data } = await http.get<User.Info>(API_ENDPOINTS.USER.GET.INFO, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const updateTodayQuizCount = async (payload: User.Request.UpdateTodayQuizCount) => {
  const session = await auth()

  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_QUIZ_COUNT, payload, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: unknown) {
    throw error
  }
}

export const updateQuizNotification = async (payload: User.Request.UpdateQuizNotification) => {
  const session = await auth()

  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NOTIFICATION, payload, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: unknown) {
    throw error
  }
}

export const updateUserName = async (payload: User.Request.UpdateName) => {
  const session = await auth()

  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NAME, payload, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: unknown) {
    throw error
  }
}

export const updateCollectionFields = async (payload: User.Request.UpdateCollectionFields) => {
  const session = await auth()

  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_COLLECTION_FIELDS, payload, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
  } catch (error: unknown) {
    throw error
  }
}
