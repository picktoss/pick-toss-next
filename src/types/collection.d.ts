type Collection = {
  id: number
  name: string
  emoji: string
  bookmarkCount: number
  collectionField: string
  memberName: string
  quizCount: number
}

/** GET /api/v2/collections */
interface AllCollectionsResponse {
  collections: Collection[]
}

/** GET /api/v2/collections/{keyword} */
interface KeywordCollectionsResponse {
  collections: Collection[]
}

/** GET /api/v2/collections/{collection_id}/record */
interface CollectionRecordResponse {
  createdAt: string
  elapsedTime: numberz
  quizzes: {
    question: string
    answer: string
    explanation: string
    options: string[]
    choseAnswer: string
  }[]
}

/** GET /api/v2/collections/{collection_id}/collection_info */
interface CollectionInfoResponse {
  id: number
  name: string
  description: string
  solvedCount: number
  bookmarkCount: number
  quizzes: {
    question: string
    answer: string
    explanation: string
    options: string[]
    quizType: 'MIX_UP' | 'MULTIPLE_CHOICE'
  }[]
}

/** GET /api/v2/collections/my-collections */
interface MyCollectionsResponse {
  collections: Collection[]
}

/** GET /api/v2/collections/interest-field-collection */
interface InterestFieldCollectionsResponse {
  collections: Collection[]
}

/** GET /api/v2/collections/bookmarked-collections */
interface BookmarkedCollectionsResponse {
  collections: Collection[]
}

/** GET /api/v2/collections-analysis */
interface CollectionAnalysisResponse {
  collectionsAnalysis: {
    additionalProp1: number
    additionalProp2: number
    additionalProp3: number
  }
}

/** PATCH /api/v2/collections/{collection_id}/update-quizzes */
interface UpdateCollectionQuizzesPayload {
  quizzes: number[]
}

/** PATCH /api/v2/collections/{collection_id}/update-info */
interface UpdateCollectionInfoPayload {
  name: string
  emoji: string
  description: string
  collectionField:
    | 'IT'
    | 'LAW'
    | 'BUSINESS_ECONOMY'
    | 'SOCIETY_POLITICS'
    | 'LANGUAGE'
    | 'MEDICINE_PHARMACY'
    | 'ART'
    | 'SCIENCE_ENGINEERING'
    | 'HISTORY_PHILOSOPHY'
    | 'OTHER'
}

/** PATCH /api/v2/collections/{collection_id}/update-collection-result */
interface UpdateCollectionResultPayload {
  collectionQuizzes: {
    quizId: number
    elapsedTimeMs: number
    isAnswer: boolean
    choseAnswer: string
  }[]
}

/** PATCH /api/v2/collection/{collection_id}/add-quiz */
interface AddQuizPayload {
  quizId: number
}

/** POST /api/v2/collections */
interface CreateCollectionPayload {
  name: string
  emoji: string
  description: string
  collectionField:
    | 'IT'
    | 'LAW'
    | 'BUSINESS_ECONOMY'
    | 'SOCIETY_POLITICS'
    | 'LANGUAGE'
    | 'MEDICINE_PHARMACY'
    | 'ART'
    | 'SCIENCE_ENGINEERING'
    | 'HISTORY_PHILOSOPHY'
    | 'OTHER'
  quizzes: number[]
}

declare namespace Collection {
  type Item = Collection
  type List = Collection[]

  declare namespace Request {
    /** GET /api/v2/collections
     * 모든 컬렉션 가져오기
     */
    type AllCollections = void

    /** GET /api/v2/collections/{keyword}
     * 키워드로 컬렉션 검색하기
     */
    type KeywordCollections = void

    /** GET /api/v2/collections/{collection_id}/record
     * 퀴즈를 푼 컬렉션의 상세 기록 가져오기
     */
    type CollectionRecord = void

    /** GET /api/v2/collections/{collection_id}/collection_info
     * 특정 컬렉션의 상세 정보 가져오기
     */
    type CollectionInfo = void

    /** GET /api/v2/collections/my-collections
     * 직접 생성한 컬렉션 가져오기
     */
    type MyCollections = void

    /** GET /api/v2/collections/interest-field-collection
     * 사용자 관심 분야 컬렉션 가져오기
     */
    type InterestFieldCollections = void

    /** GET /api/v2/collections/bookmarked-collections
     * 북마크한 컬렉션 가져오기
     */
    type BookmarkedCollections = void

    /** GET /api/v2/collections-analysis
     * 컬렉션 분석
     */
    type CollectionAnalysis = void

    // PATCH Requests
    /** PATCH /api/v2/collections/{collection_id}/update-quizzes
     * 컬렉션 문제 편집
     */
    type UpdateQuizzes = UpdateQuizzesPayload

    /** PATCH /api/v2/collections/{collection_id}/update-info
     * 컬렉션 정보 수정
     */
    type UpdateInfo = UpdateCollectionInfoPayload

    /** PATCH /api/v2/collections/{collection_id}/update-collection-result
     * 컬렉션 퀴즈 결과 업데이트
     */
    type UpdateCollectionResult = UpdateCollectionResultPayload

    /** PATCH /api/v2/collection/{collection_id}/add-quiz
     * 컬렉션에 퀴즈 추가
     */
    type AddQuiz = AddQuizPayload

    // POST Requests
    /** POST /api/v2/collections
     * 컬렉션 생성
     */
    type CreateCollection = CreateCollectionPayload

    /** POST /api/v2/collections/{collection_id}/create-bookmark
     * 컬렉션 북마크하기
     */
    type CreateBookmark = void

    // DELETE Requests
    /** DELETE /api/v2/collections/{collection_id}/delete-collection
     * 컬렉션 삭제
     */
    type DeleteCollection = void

    /** DELETE /api/v2/collections/{collection_id}/delete-bookmark
     * 컬렉션 북마크 삭제
     */
    type DeleteBookmark = void
  }

  declare namespace Response {
    /** GET /api/v2/collections
     * 모든 컬렉션 가져오기
     */
    type AllCollections = AllCollectionsResponse

    /** GET /api/v2/collections/{keyword}
     * 키워드로 컬렉션 검색하기
     */
    type KeywordCollections = KeywordCollectionsResponse

    /** GET /api/v2/collections/{collection_id}/record
     * 퀴즈를 푼 컬렉션의 상세 기록 가져오기
     */
    type CollectionRecord = CollectionRecordResponse

    /** GET /api/v2/collections/{collection_id}/collection_info
     * 특정 컬렉션의 상세 정보 가져오기
     */
    type CollectionInfo = CollectionInfoResponse

    /** GET /api/v2/collections/my-collections
     * 직접 생성한 컬렉션 가져오기
     */
    type MyCollections = MyCollectionsResponse

    /** GET /api/v2/collections/interest-field-collection
     * 사용자 관심 분야 컬렉션 가져오기
     */
    type InterestFieldCollections = InterestFieldCollectionsResponse

    /** GET /api/v2/collections/bookmarked-collections
     * 북마크한 컬렉션 가져오기
     */
    type BookmarkedCollections = BookmarkedCollectionsResponse

    /** GET /api/v2/collections-analysis
     * 컬렉션 분석
     */
    type CollectionAnalysis = CollectionAnalysisResponse

    // PATCH Responses
    /** PATCH /api/v2/collections/{collection_id}/update-quizzes
     * 컬렉션 문제 편집
     */
    type UpdateQuizzes = void

    /** PATCH /api/v2/collections/{collection_id}/update-info
     * 컬렉션 정보 수정
     */
    type UpdateInfo = void

    /** PATCH /api/v2/collections/{collection_id}/update-collection-result
     * 컬렉션 퀴즈 결과 업데이트
     */
    type UpdateCollectionResult = void

    /** PATCH /api/v2/collection/{collection_id}/add-quiz
     * 컬렉션에 퀴즈 추가
     */
    type AddQuiz = void

    // POST Responses
    /** POST /api/v2/collections
     * 컬렉션 생성
     */
    type CreateCollection = Collection

    /** POST /api/v2/collections/{collection_id}/create-bookmark
     * 컬렉션 북마크하기
     */
    type CreateBookmark = void

    // DELETE Responses
    /** DELETE /api/v2/collections/{collection_id}/delete-collection
     * 컬렉션 삭제
     */
    type DeleteCollection = void

    /** DELETE /api/v2/collections/{collection_id}/delete-bookmark
     * 컬렉션 북마크 삭제
     */
    type DeleteBookmark = void
  }
}
