export const API_ENDPOINTS = {
  AUTH: {
    /** GET /oauth/url - Oauth url api */
    OAUTH_URL: '/oauth/url',
    /** GET /health-check - Health check */
    HEALTH_CHECK: '/health-check',
    /** GET /callback - Oauth callback */
    CALLBACK: '/callback',
    /** POST /login - login */
    LOGIN: '/login',
    /** POST /auth/verification */
    VERIFICATION: '/auth/verification',
    /** POST /auth/verification/check */
    VERIFICATION_CHECK: '/auth/verification/check',
    TEST: {
      /** POST /test/create-today-quiz - 오늘의 퀴즈 생성 API(테스트용) */
      CREATE_TODAY_QUIZ: '/test/create-today-quiz',
    },
  },

  COLLECTION: {
    GET: {
      /** GET /collections - 모든 컬렉션 가져오기(탐색) */
      ALL: '/collections',
      /** GET /collections/{keyword} - 컬렉션 검색하기 */
      BY_KEYWORD: (keyword: string) => `/collections/${keyword}`,
      /** GET /collections/{collection_id}/collection_info - 만든 컬렉션 상세 정보 가져오기 */
      INFO: (collectionId: number) => `/collections/${collectionId}/info`,
      /** GET /collections/my-collections - 직접 생성한 컬렉션 가져오기 */
      MY_COLLECTIONS: '/collections/my-collections',
      /** GET /collections/interest-field-collection - 사용자 관심 분야 컬렉션 가져오기 */
      INTEREST_FIELD: '/collections/interest-field-collection',
      /** GET /collections/bookmarked-collections - 북마크한 컬렉션 가져오기 */
      BOOKMARKED: '/collections/bookmarked-collections',
      /** GET /collections-analysis - 컬렉션 분석 */
      ANALYSIS: '/collections-analysis',
    },
    POST: {
      /** POST /collections - 컬렉션 생성 */
      CREATE_COLLECTION: `/collections`,
      /** POST /collections - 컬렉션 북마크하기 */
      CREATE_BOOKMARK: (collectionId: number) => `/collections/${collectionId}/create-bookmark`,
      /** POST /collections/{collection_id}/collection-quizzes - 컬렉션 퀴즈 시작 */
      START_QUIZ: (collectionId: number) => `/collections/${collectionId}/collection-quizzes`,
    },
    PATCH: {
      /** PATCH /collections/{collection_id}/update-quizzes - 컬렉션 문제 편집 */
      UPDATE_QUIZZES: (collectionId: number) => `/collections/${collectionId}/update-quizzes`,
      /** PATCH /collections/{collection_id}/update-info - 컬렉션 정보 수정 */
      UPDATE_INFO: (collectionId: number) => `/collections/${collectionId}/update-info`,
      /** PATCH /collection/{collection_id}/add-quiz - 컬렉션에 퀴즈 추가 */
      ADD_QUIZ: (collectionId: number) => `/collection/${collectionId}/add-quiz`,
    },
    DELETE: {
      /** DELETE /collections/{collection_id}/delete-collection - 컬렉션 삭제 */
      COLLECTION: (collectionId: number) => `/collections/${collectionId}/delete-collection`,
      /** DELETE /collections/{collection_id}/delete-bookmark - 컬렉션 북마크 취소하기 */
      BOOKMARK: (collectionId: number) => `/collections/${collectionId}/delete-bookmark`,
    },
  },

  DIRECTORY: {
    GET: {
      /** GET /directories - 모든 디렉토리 가져오기 */
      ALL: '/directories',
      /** GET /directories/{directory_id} - directory_id로 디렉토리 가져오기 */
      BY_ID: (directoryId: number) => `/directories/${directoryId}`,
    },
    POST: {
      /** POST /directories - 디렉토리 생성 */
      CREATE: '/directories',
    },
    PATCH: {
      /** PATCH /directories/{directory_id}/update-info - 디렉토리 정보 변경 */
      UPDATE_INFO: (directoryId: number) => `/directories/${directoryId}/update-info`,
    },
    DELETE: {
      /** DELETE /directories/{directory_id} - 디렉토리 삭제 */
      BY_ID: (directoryId: number) => `/directories/${directoryId}`,
    },
  },

  DOCUMENT: {
    GET: {
      /** GET /documents/{document_id} - document_id로 문서 가져오기 */
      BY_ID: (documentId: number) => `/documents/${documentId}`,
      /** GET /documents/review-need-documents - 복습 필수 노트 top 5 */
      REVIEW_NEEDED: '/documents/review-need-documents',
      /** GET /directories/documents - 모든 문서 가져오기 */
      ALL: '/directories/documents',
    },
    PATCH: {
      /** PATCH /documents/{document_id}/update-name - 문서 이름 변경 */
      UPDATE_NAME: (documentId: number) => `/documents/${documentId}/update-name`,
      /** PATCH /documents/{document_id}/update-content - 문서 내용 업데이트 */
      UPDATE_CONTENT: (documentId: number) => `/documents/${documentId}/update-content`,
      /** PATCH /documents/today-quiz-settings - 오늘의 퀴즈 관리 */
      UPDATE_TODAY_QUIZ_SETTINGS: '/documents/today-quiz-settings',
      /** PATCH /documents/move - 문서 다른 폴더로 옮기기 */
      MOVE: '/documents/move',
    },
    POST: {
      /** POST /documents - 문서 생성 */
      CREATE: '/documents',
      /** POST /documents/search - 문서 검색 */
      SEARCH: '/documents/search',
    },
    DELETE: {
      /** DELETE /documents/delete-documents - 문서 삭제
       * //참고사항 : body로 documentIds를 리스트 형태로 보내야합니다 (swagger참고)
       */
      DOCUMENTS: '/documents/delete-documents',
    },
  },

  SEARCH: {
    POST: {
      /** POST /integrated-search - 통합(문서, 컬렉션, 퀴즈) 검색 */
      SEARCH_ALL: '/integrated-search',
    },
  },

  FEEDBACK: {
    /** POST /feedback - Create Feedback */
    CREATE: '/feedback',
  },

  USER: {
    GET: {
      /** GET /members/info - Get member info */
      INFO: '/members/info',
    },
    PATCH: {
      /** PATCH /members/update-today-quiz-count - 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정) */
      UPDATE_QUIZ_COUNT: '/members/update-today-quiz-count',
      /** PATCH /members/update-quiz-notification - Update quiz notification */
      UPDATE_NOTIFICATION: '/members/update-quiz-notification',
      /** PATCH /members/update-name - Update member name */
      UPDATE_NAME: '/members/update-name',
      /** PATCH /members/update-collection-fields - 관심분야 태그 설정 */
      UPDATE_COLLECTION_CATEGORIES: '/members/update-collection-categories',
    },
  },

  FCM: {
    POST: {
      /** POST /tokens - FCM토큰 서버로 전송 */
      TOKEN: '/tokens',
    },
  },

  QUIZ: {
    BASE: '/quizzes',
    GET: {
      /** GET /today-quiz-info - 오늘의 퀴즈 현황 */
      TODAY_INFO: '/today-quiz-info',
      /** GET /quizzes - 생성된 모든 퀴즈 가져오기(전체 문서) */
      ALL: '/quizzes',
      /** GET /quizzes/{quiz_set_id}/{quiz_set_type}/quiz-record - 퀴즈 세트에 대한 상세 기록 */
      RECORD: (quizSetId: string, quizSetType: Quiz.Set.Type) =>
        `/quizzes/${quizSetId}/${quizSetType}/quiz-record`,
      /** GET /quizzes/quiz-records - 전체 퀴즈 기록 */
      ALL_RECORDS: '/quizzes/quiz-records',
      BY_SET_ID: (quizSetId: string) => `/quiz-sets/${quizSetId}`,
      /** GET /quiz-sets/today - 오늘의 퀴즈 세트 정보 가져오기 */
      TODAY_SET: '/quiz-sets/today',
      /** GET /quiz-analysis - 퀴즈 분석 */
      ANALYSIS: '/quiz-analysis',
      /** GET /documents/{document_id}/review-pick - document_id로 복습 pick 가져오기 */
      REVIEW_PICK: (documentId: number) => `/documents/${documentId}/review-pick`,
      /** GET /documents/{document_id}/quizzes - document_id에 해당하는 모든 퀴즈 가져오기 */
      BY_DOCUMENT: (documentId: number) => `/documents/${documentId}/quizzes`,
      /** GET /directories/{directory_id}/quizzes - 디렉토리에 생성된 모든 퀴즈 랜덤하게 가져오기 */
      BY_DIRECTORY: (directoryId: number) => `/directories/${directoryId}/quizzes`,
      /** GET /documents/{document_id}/download-quiz - 퀴즈 다운로드 */
      DOWNLOAD: (documentId: number) => `/documents/${documentId}/download-quiz`,
      /** GET /incorrect-quizzes - 오답 터뜨리기 퀴즈 가져오기 */
      WRONG_ANSWER: '/incorrect-quizzes',
    },
    PATCH: {
      /** PATCH /quiz/result - 퀴즈 결과 업데이트 */
      UPDATE_RESULT: '/quiz/result',
      /** PATCH /quiz/result - 랜덤 퀴즈 결과 업데이트 */
      UPDATE_RANDOM_RESULT: '/random-quiz/result',
      /** PATCH /quiz/result - 오답 터뜨리기 결과 업데이트 */
      UPDATE_WRONG_RESULT: '/wrong-quiz/result',
    },
    DELETE: {
      /** DELETE /quizzes/{quiz_id}/delete-quiz - 퀴즈 삭제 */
      QUIZ: (quizId: number) => `/quizzes/${quizId}/delete-quiz`,
      /** DELETE /quizzes/{quiz_id}/delete-invalid-quiz - 잘못된 퀴즈 삭제 */
      INVALID_QUIZ: (quizId: number) => `/quizzes/${quizId}/delete-invalid-quiz`,
    },
    POST: {
      /** POST /quizzes/documents/{document_id}/custom-quiz-set - 사용자가 생성한 기존 문서에서 직접 퀴즈 세트 (다시)생성 */
      REPLAY: (documentId: number) => `/quizzes/documents/${documentId}/custom-quiz-set`,
      /** POST /quizzes/documents/{document_id}/check-quiz-set - 퀴즈 생성 후, 퀴즈 오류 확인을 위한 퀴즈세트 생성 */
      CHECK_QUIZ_SET: (documentId: number) => `/quizzes/documents/${documentId}/check-quiz-set`,
      /** POST /collections/{collection_id}/collection-quizzes - 컬렉션 퀴즈 시작하기 */
      COLLECTION: (collectionId: number) => `/collections/${collectionId}/collection-quizzes`,
    },
  },
} as const

export type ApiEndpoints = typeof API_ENDPOINTS
