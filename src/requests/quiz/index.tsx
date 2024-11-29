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

export const fetchQuizSet = async ({ quizSetId }: { quizSetId: string }) => {
  const session = await auth()

  try {
    const { data } = await http.get<Quiz.Response.GetQuizSet>(
      API_ENDPOINTS.QUIZ.GET.SET(quizSetId),
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
    const { data } = await http.get<Quiz.Response.GetDirectoryQuizzes>(
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

export const updateQuizResults = async () => {}
