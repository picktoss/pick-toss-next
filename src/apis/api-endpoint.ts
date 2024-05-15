import { HttpMethod } from '@/lib/api-client'

export const API_ENDPOINT = {
  // 퀴즈
  quiz: {
    getTodayQuiz: () => ({
      url: `/todayQuiz`,
      method: HttpMethod.GET,
    }),
    getBookmarks: () => ({
      url: `/bookmark`,
      method: HttpMethod.GET,
    }),
    postBookmark: (quizId: number) => ({
      url: `/bookmark/${quizId}`,
      method: HttpMethod.POST,
    }),
    deleteBookmark: (quizId: number) => ({
      url: `/bookmark/${quizId}`,
      method: HttpMethod.DELETE,
    }),
  },

  // 문서 관련 API
  document: {},

  // 재화 관련 API
  star: {
    getStarEvent: () => ({
      url: `/starEvent`,
      method: HttpMethod.GET,
    }),
  },

  // 사용자 관련 API
  user: {
    getUser: () => ({
      url: `/user`,
      method: HttpMethod.GET,
    }),
  },

  // auth 관련 API
  auth: {
    signIn: () => ({
      url: `/auth`,
      method: HttpMethod.POST,
    }),
    verifyEmail: () => ({
      url: `/auth/verification`,
      method: HttpMethod.POST,
    }),
    checkVerification: () => ({
      url: `/auth/verification/check`,
      method: HttpMethod.POST,
    }),
  },
}
