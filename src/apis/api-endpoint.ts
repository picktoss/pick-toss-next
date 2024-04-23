import { ServerEnv } from '@/apis/server-env'

enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const baseUrl = ServerEnv.apiUrl()

export const API_ENDPOINT = {
  // 퀴즈
  quiz: {
    getTodayQuiz: () => ({
      url: `${baseUrl}/todayQuiz`,
      method: Method.GET,
    }),
    getBookmarks: () => ({
      url: `${baseUrl}/bookmark`,
      method: Method.GET,
    }),
    postBookmark: (quizId: number) => ({
      url: `${baseUrl}/bookmark/${quizId}`,
      method: Method.POST,
    }),
    deleteBookmark: (quizId: number) => ({
      url: `${baseUrl}/bookmark/${quizId}`,
      method: Method.DELETE,
    }),
  },

  // 문서 관련 API
  document: {},

  // 재화 관련 API
  star: {
    getStarEvent: () => ({
      url: `${baseUrl}/starEvent`,
      method: Method.GET,
    }),
  },

  // 사용자 관련 API
  user: {
    getUser: () => ({
      url: `${baseUrl}/user`,
      method: Method.GET,
    }),
  },

  // auth 관련 API
  auth: {
    signIn: () => ({
      url: `${baseUrl}/auth`,
      method: Method.POST,
    }),
    verifyEmail: () => ({
      url: `${baseUrl}/auth/verification`,
      method: Method.POST,
    }),
    checkVerification: () => ({
      url: `${baseUrl}/auth/verification/check`,
      method: Method.POST,
    }),
  },
}
