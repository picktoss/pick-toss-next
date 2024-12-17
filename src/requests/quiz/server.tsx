'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

/** GET /quiz-sets/today - 오늘의 퀴즈 세트 정보 가져오기 */
export const getTodayQuizSetId = async () => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetTodayQuizSet>(
      API_ENDPOINTS.QUIZ.GET.TODAY_SET
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /api/v2/quiz-sets/{quiz_set_id} quizSet-type과 quizSet_id로 퀴즈 세트 가져오기 */
export const getQuizSetById = async ({
  quizSetId,
  quizSetType,
}: {
  quizSetId: string
  quizSetType: Quiz.Set.Type
}) => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetBaseQuizSet>(
      API_ENDPOINTS.QUIZ.GET.BY_SET_ID(quizSetId),
      {
        params: {
          'quiz-set-type': quizSetType,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quizzes/quiz-records - 전체 퀴즈 기록 */
export const getQuizRecords = async () => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetQuizRecords>(
      API_ENDPOINTS.QUIZ.GET.ALL_RECORDS
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quizzes/{solved_date}/quiz-record - 날짜별 퀴즈 기록록 */
export const getQuizRecordsByDate = async (date: string) => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetQuizRecordsByDate>(
      API_ENDPOINTS.QUIZ.GET.DATE_RECORDS(date)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record - 퀴즈 세트에 대한 상세 기록 */
export const getQuizDetailRecord = async ({
  quizSetId,
  quizSetType,
}: {
  quizSetId: string
  quizSetType: Quiz.Set.Type
}) => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetQuizSetRecord>(
      API_ENDPOINTS.QUIZ.GET.RECORD(quizSetId, quizSetType)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quiz-sets/today - 오늘의 퀴즈 세트 정보 가져오기 */
export const getTodayQuizInfo = async () => {
  try {
    const { data } = await httpServer.get<Quiz.Response.GetTodayInfo>(
      API_ENDPOINTS.QUIZ.GET.TODAY_SET
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}
