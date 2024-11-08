export const API_ENDPOINTS = {
  AUTH: {
    /** GET /api/v2/oauth/url - Oauth url api */
    OAUTH_URL: '/api/v2/oauth/url',
    /** GET /api/v2/health-check - Health check */
    HEALTH_CHECK: '/api/v2/health-check',
    /** GET /api/v2/callback - Oauth callback */
    CALLBACK: '/api/v2/callback',
    /** POST /api/v2/login - login */
    LOGIN: '/api/v2/login',
    /** POST /api/v2/auth/verification */
    VERIFICATION: '/api/v2/auth/verification',
    /** POST /api/v2/auth/verification/check */
    VERIFICATION_CHECK: '/api/v2/auth/verification/check',
    TEST: {
      /** POST /api/v2/test/create-today-quiz - 오늘의 퀴즈 생성 API(테스트용) */
      CREATE_TODAY_QUIZ: '/api/v2/test/create-today-quiz',
    },
  },

  COLLECTION: {
    /** GET /api/v2/collections - 모든 컬렉션 가져오기(탐색) */
    BASE: '/api/v2/collections',
    GET: {
      /** GET /api/v2/collections/{keyword} - 컬렉션 검색하기 */
      BY_KEYWORD: (keyword: string) => `/api/v2/collections/${keyword}`,
      /** GET /api/v2/collections/{collection_id}/record - 퀴즈를 푼 컬렉션의 상세 기록 */
      RECORD: (collectionId: number) => `/api/v2/collections/${collectionId}/record`,
      /** GET /api/v2/collections/{collection_id}/collection_info - 만든 컬렉션 상세 정보 가져오기 */
      INFO: (collectionId: number) => `/api/v2/collections/${collectionId}/collection_info`,
      /** GET /api/v2/collections/my-collections - 직접 생성한 컬렉션 가져오기 */
      MY_COLLECTIONS: '/api/v2/collections/my-collections',
      /** GET /api/v2/collections/interest-field-collection - 사용자 관심 분야 컬렉션 가져오기 */
      INTEREST_FIELD: '/api/v2/collections/interest-field-collection',
      /** GET /api/v2/collections/bookmarked-collections - 북마크한 컬렉션 가져오기 */
      BOOKMARKED: '/api/v2/collections/bookmarked-collections',
      /** GET /api/v2/collections-analysis - 컬렉션 분석 */
      ANALYSIS: '/api/v2/collections-analysis',
    },
    PATCH: {
      /** PATCH /api/v2/collections/{collection_id}/update-quizzes - 컬렉션 문제 편집 */
      UPDATE_QUIZZES: (collectionId: number) =>
        `/api/v2/collections/${collectionId}/update-quizzes`,
      /** PATCH /api/v2/collections/{collection_id}/update-info - 컬렉션 정보 수정 */
      UPDATE_INFO: (collectionId: number) => `/api/v2/collections/${collectionId}/update-info`,
      /** PATCH /api/v2/collections/{collection_id}/update-collection-result - 컬렉션을 풀었을 때 결과 업데이트 */
      UPDATE_RESULT: (collectionId: number) =>
        `/api/v2/collections/${collectionId}/update-collection-result`,
      /** PATCH /api/v2/collection/{collection_id}/add-quiz - 컬렉션에 퀴즈 추가 */
      ADD_QUIZ: (collectionId: number) => `/api/v2/collection/${collectionId}/add-quiz`,
    },
    DELETE: {
      /** DELETE /api/v2/collections/{collection_id}/delete-collection - 컬렉션 삭제 */
      COLLECTION: (collectionId: number) => `/api/v2/collections/${collectionId}/delete-collection`,
      /** DELETE /api/v2/collections/{collection_id}/delete-bookmark - 컬렉션 북마크 취소하기 */
      BOOKMARK: (collectionId: number) => `/api/v2/collections/${collectionId}/delete-bookmark`,
    },
  },

  DIRECTORY: {
    /** GET /api/v2/directories - 모든 디렉토리 가져오기 */
    BASE: '/api/v2/directories',
    GET: {
      /** GET /api/v2/directories/{directory_id} - directory_id로 디렉토리 가져오기 */
      BY_ID: (directoryId: number) => `/api/v2/directories/${directoryId}`,
    },
    PATCH: {
      /** PATCH /api/v2/directories/{directory_id}/update-info - 디렉토리 정보 변경 */
      UPDATE_INFO: (directoryId: number) => `/api/v2/directories/${directoryId}/update-info`,
    },
    DELETE: {
      /** DELETE /api/v2/directories/{directory_id} - 디렉토리 삭제 */
      BY_ID: (directoryId: number) => `/api/v2/directories/${directoryId}`,
    },
  },

  DOCUMENT: {
    /** POST /api/v2/documents - 문서 생성 */
    BASE: '/api/v2/documents',
    GET: {
      /** GET /api/v2/documents/{document_id} - document_id로 문서 가져오기 */
      BY_ID: (documentId: number) => `/api/v2/documents/${documentId}`,
      /** GET /api/v2/documents/review-need-documents - 복습 필수 노트 top 5 */
      REVIEW_NEEDED: '/api/v2/documents/review-need-documents',
      /** GET /api/v2/directories/documents - 모든 문서 가져오기 */
      ALL: '/api/v2/directories/documents',
    },
    PATCH: {
      /** PATCH /api/v2/documents/{document_id}/update-name - 문서 이름 변경 */
      UPDATE_NAME: (documentId: number) => `/api/v2/documents/${documentId}/update-name`,
      /** PATCH /api/v2/documents/{document_id}/update-content - 문서 내용 업데이트 */
      UPDATE_CONTENT: (documentId: number) => `/api/v2/documents/${documentId}/update-content`,
      /** PATCH /api/v2/documents/today-quiz-settings - 오늘의 퀴즈 관리 */
      UPDATE_TODAY_QUIZ_SETTINGS: '/api/v2/documents/today-quiz-settings',
      /** PATCH /api/v2/documents/move - 문서 다른 폴더로 옮기기 */
      MOVE: '/api/v2/documents/move',
    },
    POST: {
      /** POST /api/v2/integrated-search - 통합(문서, 컬렉션, 퀴즈) 검색 */
      SEARCH_ALL: '/api/v2/integrated-search',
      /** POST /api/v2/documents/search - 문서 검색 */
      SEARCH: '/api/v2/documents/search',
    },
    DELETE: {
      /** DELETE /api/v2/documents/delete-documents - 문서 삭제 */
      DOCUMENTS: '/api/v2/documents/delete-documents',
    },
  },

  FEEDBACK: {
    /** POST /api/v2/feedback - Create Feedback */
    CREATE: '/api/v2/feedback',
  },

  MEMBER: {
    /** GET /api/v2/members/info - Get member info */
    BASE: '/api/v2/members',
    GET: {
      /** GET /api/v2/members/info - Get member info */
      INFO: '/api/v2/members/info',
    },
    PATCH: {
      /** PATCH /api/v2/members/update-today-quiz-count - 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정) */
      UPDATE_QUIZ_COUNT: '/api/v2/members/update-today-quiz-count',
      /** PATCH /api/v2/members/update-quiz-notification - Update quiz notification */
      UPDATE_NOTIFICATION: '/api/v2/members/update-quiz-notification',
      /** PATCH /api/v2/members/update-name - Update member name */
      UPDATE_NAME: '/api/v2/members/update-name',
      /** PATCH /api/v2/members/update-collection-fields - 관심분야 태그 설정 */
      UPDATE_COLLECTION_FIELDS: '/api/v2/members/update-collection-fields',
    },
  },

  QUIZ: {
    BASE: '/api/v2/quizzes',
    GET: {
      /** GET /api/v2/today-quiz-info - 오늘의 퀴즈 현황 */
      TODAY_INFO: '/api/v2/today-quiz-info',
      /** GET /api/v2/quizzes - 생성된 모든 퀴즈 가져오기(전체 문서) */
      ALL: '/api/v2/quizzes',
      /** GET /api/v2/quizzes/{quiz_set_id}/quiz-record - 퀴즈 세트에 대한 상세 기록 */
      RECORD: (quizSetId: number) => `/api/v2/quizzes/${quizSetId}/quiz-record`,
      /** GET /api/v2/quizzes/quiz-records - 전체 퀴즈 기록 */
      ALL_RECORDS: '/api/v2/quizzes/quiz-records',
      /** GET /api/v2/quiz-sets/{quiz_set_id} - quizSet_id로 퀴즈 가져오기 */
      SET: (quizSetId: number) => `/api/v2/quiz-sets/${quizSetId}`,
      /** GET /api/v2/quiz-sets/today - 오늘의 퀴즈 세트 정보 가져오기 */
      TODAY_SET: '/api/v2/quiz-sets/today',
      /** GET /api/v2/quiz-analysis - 퀴즈 분석 */
      ANALYSIS: '/api/v2/quiz-analysis',
      /** GET /api/v2/documents/{document_id}/review-pick - document_id로 복습 pick 가져오기 */
      REVIEW_PICK: (documentId: number) => `/api/v2/documents/${documentId}/review-pick`,
      /** GET /api/v2/documents/{document_id}/quizzes - document_id에 해당하는 모든 퀴즈 가져오기 */
      BY_DOCUMENT: (documentId: number) => `/api/v2/documents/${documentId}/quizzes`,
      /** GET /api/v2/documents/{document_id}/download-quiz - 퀴즈 다운로드 */
      DOWNLOAD: (documentId: number) => `/api/v2/documents/${documentId}/download-quiz`,
    },
    PATCH: {
      /** PATCH /api/v2/quiz/result - 퀴즈 결과 업데이트 */
      UPDATE_RESULT: '/api/v2/quiz/result',
    },
    DELETE: {
      /** DELETE /api/v2/quizzes/{quiz_id}/delete-quiz - 퀴즈 삭제 */
      QUIZ: (quizId: number) => `/api/v2/quizzes/${quizId}/delete-quiz`,
      /** DELETE /api/v2/quizzes/{quiz_id}/delete-invalid-quiz - 잘못된 퀴즈 삭제 */
      INVALID_QUIZ: (quizId: number) => `/api/v2/quizzes/${quizId}/delete-invalid-quiz`,
    },
    POST: {
      /** POST /api/v2/quizzes/documents/{document_id}/create-quizzes - 사용자가 생성한 문서에서 직접 퀴즈 생성 */
      CREATE: (documentId: number) => `/api/v2/quizzes/documents/${documentId}/create-quizzes`,
    },
  },
} as const

export type ApiEndpoints = typeof API_ENDPOINTS
