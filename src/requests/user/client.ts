'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/** PATCH /members/update-today-quiz-count - 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정) */
export const updateTodayQuizCount = async (payload: User.Request.UpdateTodayQuizCount) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_QUIZ_COUNT, payload)
  } catch (error: unknown) {
    throw error
  }
}

/** PATCH /members/update-quiz-notification - 사용자 알림 ON/OFF */
export const updateQuizNotification = async (payload: User.Request.UpdateQuizNotification) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NOTIFICATION, payload)
  } catch (error: unknown) {
    throw error
  }
}

/** PATCH /members/update-name - 사용자 이름 수정 */
export const updateUserName = async (payload: User.Request.UpdateName) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_NAME, payload)
  } catch (error: unknown) {
    throw error
  }
}

/** PATCH /members/update-collection-fields - 관심분야 태그 설정 */
export const updateCollectionCategories = async (
  payload: User.Request.UpdateCollectionCategories
) => {
  try {
    await http.patch(API_ENDPOINTS.USER.PATCH.UPDATE_COLLECTION_CATEGORIES, payload)
  } catch (error: unknown) {
    throw error
  }
}

/** GET /members/info - Get member info */
export const getUserInfo = async () => {
  try {
    const { data } = await http.get<User.Info>(API_ENDPOINTS.USER.GET.INFO)
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** DELETE /members/withdrawal - 회원 탈퇴
 * delete 메서드로 body를 받는 api입니다 (탈퇴 사유와 내용)
 */
export const deleteAccount = async (requestBody: User.Request.DeleteAccount) => {
  try {
    await http.delete(API_ENDPOINTS.USER.DELETE.WITHDRAWAL, {
      data: requestBody,
    })
  } catch (error: unknown) {
    throw error
  }
}
