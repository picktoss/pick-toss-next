'use server'

import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { API_ENDPOINTS } from '@/shared/configs/endpoint'
import { http } from '@/shared/lib/axios/http'

export const fetchTodayQuizSetId = async () => {
  try {
    const session = await auth()

    const { data } = await http.get<Quiz.Response.GetTodayQuizSet>(
      API_ENDPOINTS.QUIZ.GET.TODAY_SET,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchQuizSetById = async ({
  quizSetId,
  collectionId,
  quizSetType,
}: {
  quizSetId: string
  collectionId?: number
  quizSetType: QuizSetType
}) => {
  const session = await auth()

  const params = collectionId
    ? { 'collection-id': collectionId, 'quiz-set-type': quizSetType }
    : { 'quiz-set-type': quizSetType }

  try {
    const { data } = await http.get<Quiz.Response.GetBaseQuizSet>(
      API_ENDPOINTS.QUIZ.GET.BY_SET_ID(quizSetId),
      {
        params,
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchDirectoryQuizzes = async ({ directoryId }: { directoryId: number }) => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetDirectoryQuizzes>(
      API_ENDPOINTS.QUIZ.GET.BY_DIRECTORY(directoryId),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchDocumentQuizzes = async ({
  documentId,
  quizType,
}: {
  documentId: number
  quizType?: Quiz.Type
}) => {
  const session = await auth()

  const params = quizType ? { 'quiz-type': quizType } : null

  try {
    const { data } = await http.get<Quiz.Response.GetDocumentQuizzes>(
      API_ENDPOINTS.QUIZ.GET.BY_DOCUMENT(documentId),
      {
        params,
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchWrongAnswerQuizzes = async () => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetWrongAnswerQuizzes>(
      API_ENDPOINTS.QUIZ.GET.WRONG_ANSWER,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const fetchQuizSetRecord = async ({
  quizSetId,
  quizSetType,
}: {
  quizSetId: string
  quizSetType: QuizSetType
}) => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetQuizSetRecord>(
      API_ENDPOINTS.QUIZ.GET.RECORD(quizSetId, quizSetType),
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const createQuizSetForCheck = async ({ documentId }: { documentId: number }) => {
  const session = await auth()

  try {
    const { data } = await http.post<Quiz.Response.CreateQuizSet>(
      API_ENDPOINTS.QUIZ.POST.CHECK_QUIZ_SET(documentId),
      null,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
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
  const session = await auth()

  try {
    const { data } = await http.post<Quiz.Response.CreateQuizSet>(
      API_ENDPOINTS.QUIZ.POST.REPLAY(documentId),
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const updateQuizResult = async (requestBody: Quiz.Request.UpdateQuizResult) => {
  const session = await auth()

  try {
    const { data } = await http.patch<Quiz.Response.UpdateQuizResult>(
      API_ENDPOINTS.QUIZ.PATCH.UPDATE_RESULT,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    )
    return data
  } catch (error: unknown) {
    throw error
  }
}

export const updateWrongQuizResult = async (requestBody: Quiz.Request.UpdateWrongQuizResult) => {
  const session = await auth()

  try {
    const response = await http.patch(API_ENDPOINTS.QUIZ.PATCH.UPDATE_WRONG_RESULT, requestBody, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
    // eslint-disable-next-line no-console
    console.log(response) // 디버깅용
  } catch (error: unknown) {
    throw error
  }
}
