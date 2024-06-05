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
    patchQuizResult: () => ({
      url: `/quiz/result`,
      method: HttpMethod.PATCH,
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

    getDocumentsForCategory: (
      categoryId: number,
      sortOption?: 'createdAt' | 'name' | 'updatedAt'
    ) => ({
      url: `/categories/${categoryId}/documents?${sortOption && `sort-option=${sortOption}`}`,
      method: HttpMethod.GET,
    }),

    deleteDocument: (documentId: number) => ({
      url: `/documents/${documentId}`,
      method: HttpMethod.DELETE,
    }),

    postAiPick: (documentId: number) => ({
      url: `/documents/${documentId}/ai-pick`,
      method: HttpMethod.POST,
    }),

    updateDocumentName: (documentId: number) => ({
      url: `/documents/${documentId}/update-name`,
      method: HttpMethod.PATCH,
    }),
  },

  // 카테고리 관련 API
  category: {
    getCategory: (categoryId: number) => ({
      url: `/categories/${categoryId}`,
      method: HttpMethod.GET,
    }),

    getCategories: () => ({
      url: `/categories`,
      method: HttpMethod.GET,
    }),

    createCategory: () => ({
      url: `/categories`,
      method: HttpMethod.POST,
    }),

    deleteCategory: (categoryId: number) => ({
      url: `/categories/${categoryId}`,
      method: HttpMethod.DELETE,
    }),

    updateCategory: (categoryId: number) => ({
      url: `/categories/${categoryId}`,
      method: HttpMethod.PATCH,
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
    updateUserName: () => ({
      url: `/members/update-name`,
      method: HttpMethod.PATCH,
    }),
    updateQuizNotification: () => ({
      url: `/members/update-quiz-notification`,
      method: HttpMethod.PATCH,
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
    verifyEmailCheck: () => ({
      url: `/auth/verification/check`,
      method: HttpMethod.POST,
    }),
  },
}
