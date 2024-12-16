'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const updateTodayQuizCount = async (payload: User.Request.UpdateTodayQuizCount) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_QUIZ_COUNT, payload)
  } catch (error: unknown) {
    throw error
  }
}

export const updateQuizNotification = async (payload: User.Request.UpdateQuizNotification) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NOTIFICATION, payload)
  } catch (error: unknown) {
    throw error
  }
}

export const updateUserName = async (payload: User.Request.UpdateName) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NAME, payload)
  } catch (error: unknown) {
    throw error
  }
}

export const updateCollectionCategories = async (
  payload: User.Request.UpdateCollectionCategories
) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_COLLECTION_CATEGORIES, payload)
  } catch (error: unknown) {
    throw error
  }
}

export const getUserInfo = async () => {
  try {
    const { data } = await http.get<User.Info>(API_ENDPOINTS.USER.GET.INFO)
    return data
  } catch (error: unknown) {
    throw error
  }
}
