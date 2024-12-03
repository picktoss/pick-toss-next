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

export const fetchDocumentQuizSet = async ({ quizSetId }: { quizSetId: string }) => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetDocumentQuizSet>(
      API_ENDPOINTS.QUIZ.GET.DOCUMENT(quizSetId),
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

export const fetchCollectionQuizSet = async ({
  collectionId,
  quizSetId,
}: {
  collectionId: number
  quizSetId: string
}) => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetCollectionQuizSet>(
      API_ENDPOINTS.QUIZ.GET.COLLECTION(collectionId, quizSetId),
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
