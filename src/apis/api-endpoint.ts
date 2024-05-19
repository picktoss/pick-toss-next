import { HttpMethod } from '@/lib/api-client'

export const API_ENDPOINT = {
  // 퀴즈
  quiz: {
    getTodayQuizSetId: () => ({
      url: `/quiz-sets/today`,
      method: HttpMethod.GET,
    }),
    getQuizSets: (quizSetId: string) => ({
      url: `/quiz-sets/${quizSetId}`,
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
  document: {
    getDocument: (documentId: number) => ({
      url: `/documents/${documentId}`,
      method: HttpMethod.GET,
    }),

    createDocument: () => ({
      url: `/documents`,
      method: HttpMethod.POST,
    }),
  },

  // 카테고리 관련 API
  category: {
    getCategories: () => ({
      url: `/categories`,
      method: HttpMethod.GET,
    }),

    createCategory: () => ({
      url: `/categories`,
      method: HttpMethod.POST,
    }),
  },

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
      url: `/members/info`,
      method: HttpMethod.GET,
    }),
  },

  // auth 관련 API
  auth: {
    signIn: () => ({
      url: `/login`,
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
