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
  collectionId,
  quizSetType,
}: {
  quizSetId: string
  collectionId?: number
  quizSetType: Quiz.Set.Type
}) => {
  const params = collectionId
    ? { 'collection-id': collectionId, 'quiz-set-type': quizSetType }
    : { 'quiz-set-type': quizSetType }

  try {
    const { data } = await httpServer.get<Quiz.Response.GetBaseQuizSet>(
      API_ENDPOINTS.QUIZ.GET.BY_SET_ID(quizSetId),
      {
        params,
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}
