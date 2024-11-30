// Common Types
type CollectionField =
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

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'

type BaseQuiz = {
  id: number
  question: string
  answer: string
  explanation: string
  options?: string[]
}

type QuizWithType = BaseQuiz & {
  quizType: QuizType
}

type Collection = {
  id: number
  name: string
  emoji: string
  bookmarkCount: number
  collectionField: CollectionField
  memberName: string
  quizCount: number
}

type CollectionQuizResult = {
  quizId: number
  elapsedTimeMs: number
  isAnswer: boolean
  choseAnswer: string
}

type AnsweredQuiz = BaseQuiz & {
  choseAnswer: string
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
  elapsedTime: number
  quizzes: AnsweredQuiz[]
}

/** GET /api/v2/collections/{collection_id}/collection_info */
interface CollectionInfoResponse {
  id: number
  name: string
  emoji: string
  description: string
  solvedCount: number
  bookmarkCount: number
  quizzes: QuizWithType[]
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
  collectionField: CollectionField
}

/** PATCH /api/v2/collections/{collection_id}/update-collection-result */
interface UpdateCollectionResultPayload {
  collectionQuizzes: CollectionQuizResult[]
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
  collectionField: CollectionField
  quizzes: number[]
}

declare namespace Collection {
  type Item = Collection
  type List = Collection[]
  type QuizResult = CollectionQuizResult
  type AnsweredQuiz = AnsweredQuiz
  type Field = CollectionField

  declare namespace Request {
    /** GET /api/v2/collections
     * 모든 컬렉션 가져오기(탐색)
     */
    type GetAllCollections = void

    /** GET /api/v2/collections/{keyword}
     * 컬렉션 검색하기
     */
    type GetCollectionsByKeyword = void

    /** GET /api/v2/collections/{collection_id}/record
     * 퀴즈를 푼 컬렉션의 상세 기록
     */
    type GetCollectionRecord = void

    /** GET /api/v2/collections/{collection_id}/collection_info
     * 만든 컬렉션 상세 정보 가져오기
     */
    type GetCollectionInfo = void

    /** GET /api/v2/collections/my-collections
     * 직접 생성한 컬렉션 가져오기
     */
    type GetMyCollections = void

    /** GET /api/v2/collections/interest-field-collection
     * 사용자 관심 분야 컬렉션 가져오기
     */
    type GetInterestFieldCollections = void

    /** GET /api/v2/collections/bookmarked-collections
     * 북마크한 컬렉션 가져오기
     */
    type GetBookmarkedCollections = void

    /** GET /api/v2/collections-analysis
     * 컬렉션 분석
     */
    type GetCollectionsAnalysis = void

    /** PATCH /api/v2/collections/{collection_id}/update-quizzes
     * 컬렉션 문제 편집
     */
    type UpdateQuizzes = UpdateCollectionQuizzesPayload

    /** PATCH /api/v2/collections/{collection_id}/update-info
     * 컬렉션 정보 수정
     */
    type UpdateInfo = UpdateCollectionInfoPayload

    /** PATCH /api/v2/collections/{collection_id}/update-collection-result
     * 컬렉션을 풀었을 때 결과 업데이트
     */
    type UpdateCollectionResult = UpdateCollectionResultPayload

    /** PATCH /api/v2/collection/{collection_id}/add-quiz
     * 컬렉션에 퀴즈 추가
     */
    type AddQuiz = AddQuizPayload

    /** POST /api/v2/collections
     * 컬렉션 생성
     */
    type CreateCollection = CreateCollectionPayload

    // DELETE Requests
    /** DELETE /api/v2/collections/{collection_id}/delete-collection
     * 컬렉션 삭제
     */
    type DeleteCollection = void

    /** DELETE /api/v2/collections/{collection_id}/delete-bookmark
     * 컬렉션 북마크 취소하기
     */
    type DeleteBookmark = void
  }

  declare namespace Response {
    /** GET /api/v2/collections
     * 모든 컬렉션 가져오기(탐색)
     */
    type GetAllCollections = AllCollectionsResponse

    /** GET /api/v2/collections/{keyword}
     * 컬렉션 검색하기
     */
    type GetCollectionsByKeyword = KeywordCollectionsResponse

    /** GET /api/v2/collections/{collection_id}/record
     * 퀴즈를 푼 컬렉션의 상세 기록
     */
    type GetCollectionRecord = CollectionRecordResponse

    /** GET /api/v2/collections/{collection_id}/collection_info
     * 만든 컬렉션 상세 정보 가져오기
     */
    type GetCollectionInfo = CollectionInfoResponse

    /** GET /api/v2/collections/my-collections
     * 직접 생성한 컬렉션 가져오기
     */
    type GetMyCollections = MyCollectionsResponse

    /** GET /api/v2/collections/interest-field-collection
     * 사용자 관심 분야 컬렉션 가져오기
     */
    type GetInterestFieldCollections = InterestFieldCollectionsResponse

    /** GET /api/v2/collections/bookmarked-collections
     * 북마크한 컬렉션 가져오기
     */
    type GetBookmarkedCollections = BookmarkedCollectionsResponse

    /** GET /api/v2/collections-analysis
     * 컬렉션 분석
     */
    type GetCollectionsAnalysis = CollectionAnalysisResponse

    /** PATCH /api/v2/collections/{collection_id}/update-quizzes
     * 컬렉션 문제 편집
     */
    type UpdateQuizzes = void

    /** PATCH /api/v2/collections/{collection_id}/update-info
     * 컬렉션 정보 수정
     */
    type UpdateInfo = void

    /** PATCH /api/v2/collections/{collection_id}/update-collection-result
     * 컬렉션을 풀었을 때 결과 업데이트
     */
    type UpdateCollectionResult = void

    /** PATCH /api/v2/collection/{collection_id}/add-quiz
     * 컬렉션에 퀴즈 추가
     */
    type AddQuiz = void

    /** POST /api/v2/collections
     * 컬렉션 생성
     */
    type CreateCollection = Collection

    /** DELETE /api/v2/collections/{collection_id}/delete-collection
     * 컬렉션 삭제
     */
    type DeleteCollection = void

    /** DELETE /api/v2/collections/{collection_id}/delete-bookmark
     * 컬렉션 북마크 취소하기
     */
    type DeleteBookmark = void
  }
}
