'use server'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { httpServer } from '@/shared/lib/axios/http-server'

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
