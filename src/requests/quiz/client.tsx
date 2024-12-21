'use client'

import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

/** GET GET /directories/{directory_id}/quizzes - 디렉토리에 생성된 모든 퀴즈 랜덤하게 가져오기 */
export const getDirectoryQuizzes = async ({ directoryId }: { directoryId: number }) => {
  try {
    const { data } = await http.get<Quiz.Response.GetDirectoryQuizzes>(
      API_ENDPOINTS.QUIZ.GET.BY_DIRECTORY(directoryId)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /documents/{document_id}/quizzes - document_id에 해당하는 모든 퀴즈 가져오기 */
export const getDocumentQuizzes = async ({
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

/** GET /incorrect-quizzes - 오답 터뜨리기 퀴즈 가져오기 */
export const getWrongAnswerQuizzes = async () => {
  try {
    const { data } = await http.get<Quiz.Response.GetWrongAnswerQuizzes>(
      API_ENDPOINTS.QUIZ.GET.WRONG_ANSWER
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record - 퀴즈 세트에 대한 상세 기록 */
export const getQuizSetRecord = async ({
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

/** POST /quizzes/documents/{document_id}/check-quiz-set - 퀴즈 생성 후, 퀴즈 오류 확인을 위한 퀴즈세트 생성 */
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

/** POST /quizzes/documents/{document_id}/custom-quiz-set - 사용자가 생성한 기존 문서에서 직접 퀴즈 세트 (다시)생성 */
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

/** PATCH /quiz/result - 퀴즈 결과 업데이트 */
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

/** PATCH /quiz/result - 오답 터뜨리기 결과 업데이트 */
export const updateWrongQuizResult = async (requestBody: Quiz.Request.UpdateWrongQuizResult) => {
  try {
    const response = await http.patch(API_ENDPOINTS.QUIZ.PATCH.UPDATE_WRONG_RESULT, requestBody)
    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    throw error
  }
}

/** POST /collections/{collection_id}/collection-quizzes - 컬렉션 퀴즈 시작하기 */
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

/** GET /quizzes/quiz-records - 전체 퀴즈 기록 */
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

/** GET /quizzes/{solved_date}/quiz-record - 날짜별 퀴즈 기록 */
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

/** GET /documents/{document_id}/review-pick - document_id로 복습 pick 가져오기 */
export const getReviewPicks = async (documentId: number) => {
  try {
    const { data } = await http.get<Quiz.Response.GetReviewPick>(
      API_ENDPOINTS.QUIZ.GET.REVIEW_PICK(documentId)
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

/** GET /quiz-sets/today - 오늘의 퀴즈 세트 정보 가져오기 */
export const getTodayQuizInfo = async () => {
  try {
    const { data } = await http.get<Quiz.Response.GetTodayInfo>(API_ENDPOINTS.QUIZ.GET.TODAY_SET)
    return data
  } catch (error: unknown) {
    throw error
  }
}
