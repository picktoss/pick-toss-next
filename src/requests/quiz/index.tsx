/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  } catch (error: any) {
    console.error(error.status)
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
  } catch (error: any) {
    console.error(error.status)
  }
}
