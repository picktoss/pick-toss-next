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
    postQuizzes: () => ({
      url: `/quizzes`,
      method: HttpMethod.POST,
    }),
    deleteQuiz: (documentId: number, quizId: number) => ({
      url: `/incorrect-quiz/${documentId}/${quizId}`,
      method: HttpMethod.DELETE,
    }),
    getWeekQuizAnswerRate: (categoryId: number) => ({
      url: `/categories/${categoryId}/quiz-answer-rate-week`,
      method: HttpMethod.GET,
    }),
    getMonthQuizAnswerRate: (categoryId: number, year: number, month: number) => ({
      url: `/categories/${categoryId}/quiz-answer-rate-month/${year}/${month}`,
      method: HttpMethod.GET,
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

    rePostAiPick: (documentId: number) => ({
      url: `/documents/${documentId}/re-upload`,
      method: HttpMethod.POST,
    }),

    updateDocumentName: (documentId: number) => ({
      url: `/documents/${documentId}/update-name`,
      method: HttpMethod.PATCH,
    }),

    updateDocumentContent: (documentId: number) => ({
      url: `/documents/${documentId}/update-content`,
      method: HttpMethod.PATCH,
    }),

    reorderDocument: () => ({
      url: `/documents/reorder`,
      method: HttpMethod.PATCH,
    }),

    getTopFive: () => ({
      url: `/documents/top-five`,
      method: HttpMethod.GET,
    }),

    searchDocument: () => ({
      url: `/documents/search`,
      method: HttpMethod.POST,
    }),
    quizCount: () => ({
      url: `/documents/quiz-count`,
      method: HttpMethod.POST,
    }),
  },

  keypoint: {
    getBookmark: () => ({
      url: `/key-point/bookmark`,
      method: HttpMethod.GET,
    }),

    getPickPointsById: (documentId: number) => ({
      url: `/documents/${documentId}/key-point`,
      method: HttpMethod.GET,
    }),

    patchBookmark: (keypointId: number) => ({
      url: `/key-point/${keypointId}/bookmark`,
      method: HttpMethod.PATCH,
    }),

    searchKeyPoints: () => ({
      url: `/key-point/search`,
      method: HttpMethod.POST,
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
      url: `/categories/info/${categoryId}`,
      method: HttpMethod.PATCH,
    }),

    reorderCategory: () => ({
      url: `/categories/reorder`,
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

  // 문의하기 관련 API
  feedback: {
    postFeedback: () => ({
      url: `/feedback`,
      method: HttpMethod.POST,
    }),
  },

  // test
  test: {
    changePoint: () => ({
      url: `/test/change-point`,
      method: HttpMethod.PATCH,
    }),
    changeAiPick: () => ({
      url: `/test/change-ai-pick`,
      method: HttpMethod.PATCH,
    }),
    createTodayQuiz: () => ({
      url: `/test/create-today-quiz`,
      method: HttpMethod.POST,
    }),
  },
}
