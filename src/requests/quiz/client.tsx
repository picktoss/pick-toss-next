'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const fetchDirectoryQuizzes = async ({ directoryId }: { directoryId: number }) => {
  try {
    const { data } = await http.get<Quiz.Response.GetDirectoryQuizzes>(
      API_ENDPOINTS.QUIZ.GET.BY_DIRECTORY(directoryId)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

// query-keys.ts에서 사용 중
export const fetchDocumentQuizzes = async ({
  documentId,
  quizType,
}: {
  documentId: number
  quizType?: Quiz.Type
}) => {
  const params = quizType ? { 'quiz-type': quizType } : null

  try {
    const { data } = await http.get<Quiz.Response.GetDocumentQuizzes>(
      API_ENDPOINTS.QUIZ.GET.BY_DOCUMENT(documentId),
      {
        params,
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

// query-keys.ts에서 사용 중
export const fetchWrongAnswerQuizzes = async () => {
  try {
    const { data } = await http.get<Quiz.Response.GetWrongAnswerQuizzes>(
      API_ENDPOINTS.QUIZ.GET.WRONG_ANSWER
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

// query-keys.ts에서 사용 중
export const fetchQuizSetRecord = async ({
  quizSetId,
  quizSetType,
}: {
  quizSetId: string
  quizSetType: Quiz.Set.Type
}) => {
  try {
    const { data } = await http.get<Quiz.Response.GetQuizSetRecord>(
      API_ENDPOINTS.QUIZ.GET.RECORD(quizSetId, quizSetType)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const createQuizSetForCheck = async ({ documentId }: { documentId: number }) => {
  try {
    const { data } = await http.post<Quiz.Response.CreateQuizSet>(
      API_ENDPOINTS.QUIZ.POST.CHECK_QUIZ_SET(documentId),
      null
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const createReplayDocumentQuizSet = async ({
  documentId,
  requestBody,
}: {
  documentId: number
  requestBody: Quiz.Request.CreateReplayQuizSet
}) => {
  try {
    const { data } = await http.post<Quiz.Response.CreateQuizSet>(
      API_ENDPOINTS.QUIZ.POST.REPLAY(documentId),
      requestBody
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const updateQuizResult = async (requestBody: Quiz.Request.UpdateQuizResult) => {
  try {
    const { data } = await http.patch<Quiz.Response.UpdateQuizResult>(
      API_ENDPOINTS.QUIZ.PATCH.UPDATE_RESULT,
      requestBody
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const updateWrongQuizResult = async (requestBody: Quiz.Request.UpdateWrongQuizResult) => {
  try {
    const response = await http.patch(API_ENDPOINTS.QUIZ.PATCH.UPDATE_WRONG_RESULT, requestBody)
    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    throw error
  }
}

export const collectionQuizzesInfo = async ({ collectionId }: { collectionId: number }) => {
  try {
    const { data } = await http.post<Quiz.Response.StartCollectionQuiz>(
      API_ENDPOINTS.QUIZ.POST.COLLECTION(collectionId)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const getQuizRecords = async () => {
  try {
    const { data } = await http.get<Quiz.Response.GetQuizRecords>(
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
    const { data } = await http.get<Quiz.Response.GetQuizRecordsByDate>(
      API_ENDPOINTS.QUIZ.GET.DATE_RECORDS(date)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}
