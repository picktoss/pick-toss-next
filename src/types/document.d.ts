type Directory = {
  id: number
  name: string
}

type SortOption = 'CREATED_AT' | 'UPDATED_AT'

type CreateType = 'WRITE' | 'FILE' | 'NOTION'

type DocumentStatus =
  | 'UNPROCESSED'
  | 'PROCESSED'
  | 'PROCESSING'
  | 'COMPLETELY_FAILED'
  | 'PARTIAL_SUCCESS'
  | 'KEYPOINT_UPDATE_POSSIBLE'
  | 'DEFAULT_DOCUMENT'

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'

type Quiz = {
  id: number
  question: string
  answer: string
  explanation: string
  options: string[]
  quizType: QuizType
}

type DocumentItem = {
  id: number
  createType: CreateType
  name: string
  status: DocumentStatus
  content: string
  characterCount: number
  totalQuizCount: number
  updatedAt: string
  directory: Directory
  quizzes: Quiz[]
  reviewNeededQuizCount: number
}

type SearchedDocument = {
  documentId: number
  documentName: string
  content: string
  directory: Directory
}

type SearchedQuiz = {
  id: number
  question: string
  answer: string
  documentName: string
  directoryName: string
}

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

type SearchedCollection = {
  id: number
  name: string
  emoji: string
  bookmarkCount: number
  collectionField: CollectionField
  memberName: string
  quizCount: number
}

/** GET /api/v2/documents/{document_id} */
interface DocumentResponse {
  document: DocumentItem
}

/** GET /api/v2/documents/review-need-documents */
interface ReviewNeedDocumentsResponse {
  documents: {
    id: number
    name: string
    reviewNeededQuizCount: number
    directory: Directory
  }[]
}

/** GET /api/v2/directories/documents */
interface AllDocumentsResponse {
  documents: DocumentItem[]
}

/** PATCH /api/v2/documents/{document_id}/update-name */
interface UpdateDocumentNamePayload {
  name: string
}

/** PATCH /api/v2/documents/{document_id}/update-content */
interface UpdateDocumentContentPayload {
  name: string
  file: File
}

/** PATCH /api/v2/documents/today-quiz-settings */
interface UpdateTodayQuizSettingsPayload {
  documentIdTodayQuizMap: {
    additionalProp1: boolean
    additionalProp2: boolean
    additionalProp3: boolean
  }
}

/** PATCH /api/v2/documents/move */
interface MoveDocumentPayload {
  documentIds: number[]
  directoryId: number
}

/** POST /api/v2/integrated-search */
interface IntegratedSearchPayload {
  keyword: string
}
interface IntegratedSearchResponse {
  documents: SearchedDocument[]
  quizzes: SearchedQuiz[]
  collections: SearchedCollection[]
}

/** POST /api/v2/documents */
interface CreateDocumentPayload {
  file: string
  directoryId: number
  documentName: string
  star: number
  quizType: QuizType
}
interface CreateDocumentResponse {
  id: number
}

/** POST /api/v2/documents/search */
interface SearchDocumentsPayload {
  keyword: string
}
interface SearchDocumentsResponse {
  documents: SearchedDocument[]
  quizzes: SearchedQuiz[]
}

declare namespace Document {
  type Item = DocumentItem
  type List = DocumentItem[]
  type Status = DocumentStatus
  type Sort = SortOption

  declare namespace Request {
    /** GET /api/v2/documents/{document_id}
     * document_id로 문서 가져오기
     */
    type GetDocument = void

    /** GET /api/v2/documents/review-need-documents
     * 복습 필수 노트 top 5
     */
    type GetReviewNeedDocuments = void

    /** GET /api/v2/directories/documents
     * 모든 문서 가져오기
     */
    type GetAllDocuments = void

    /** PATCH /api/v2/documents/{document_id}/update-name
     * 문서 이름 변경
     */
    type UpdateName = UpdateDocumentNamePayload

    /** PATCH /api/v2/documents/{document_id}/update-content
     * 문서 내용 업데이트
     */
    type UpdateContent = UpdateDocumentContentPayload

    /** PATCH /api/v2/documents/today-quiz-settings
     * 오늘의 퀴즈 관리(문제를 가져올 노트 선택)
     */
    type UpdateTodayQuizSettings = UpdateTodayQuizSettingsPayload

    /** PATCH /api/v2/documents/move
     * 문서 다른 폴더로 옮기기
     */
    type MoveDocument = MoveDocumentPayload

    /** POST /api/v2/integrated-search
     * 통합(문서, 컬렉션, 퀴즈) 검색
     */
    type IntegratedSearch = IntegratedSearchPayload

    /** POST /api/v2/documents
     * 문서 생성
     */
    type CreateDocument = CreateDocumentPayload

    /** POST /api/v2/documents/search
     * 문서 검색
     */
    type SearchDocuments = SearchDocumentsPayload

    /** DELETE /api/v2/documents/delete-documents
     * 문서 삭제
     */
    type DeleteDocuments = void
  }

  declare namespace Response {
    /** GET /api/v2/documents/{document_id}
     * document_id로 문서 가져오기
     */
    type GetDocument = DocumentResponse

    /** GET /api/v2/documents/review-need-documents
     * 복습 필수 노트 top 5
     */
    type GetReviewNeedDocuments = ReviewNeedDocumentsResponse

    /** GET /api/v2/directories/documents
     * 모든 문서 가져오기
     */
    type GetAllDocuments = AllDocumentsResponse

    /** PATCH /api/v2/documents/{document_id}/update-name
     * 문서 이름 변경
     */
    type UpdateName = void

    /** PATCH /api/v2/documents/{document_id}/update-content
     * 문서 내용 업데이트
     */
    type UpdateContent = void

    /** PATCH /api/v2/documents/today-quiz-settings
     * 오늘의 퀴즈 관리(문제를 가져올 노트 선택)
     */
    type UpdateTodayQuizSettings = void

    /** PATCH /api/v2/documents/move
     * 문서 다른 폴더로 옮기기
     */
    type MoveDocument = void

    /** POST /api/v2/integrated-search
     * 통합(문서, 컬렉션, 퀴즈) 검색
     */
    type IntegratedSearch = IntegratedSearchResponse

    /** POST /api/v2/documents
     * 문서 생성
     */
    type CreateDocument = CreateDocumentResponse

    /** POST /api/v2/documents/search
     * 문서 검색
     */
    type SearchDocuments = SearchDocumentsResponse

    /** DELETE /api/v2/documents/delete-documents
     * 문서 삭제
     */
    type DeleteDocuments = void
  }
}
