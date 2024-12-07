import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

type DirectoryInDocument = Pick<Directory.Item, 'id' | 'name'> & { emoji?: string }

type SortOption = 'CREATED_AT' | 'UPDATED_AT'

type CreateType = 'TEXT' | 'FILE' | 'NOTION'

type DocumentStatus =
  | 'UNPROCESSED'
  | 'PROCESSED'
  | 'PROCESSING'
  | 'COMPLETELY_FAILED'
  | 'PARTIAL_SUCCESS'
  | 'KEYPOINT_UPDATE_POSSIBLE'
  | 'DEFAULT_DOCUMENT'

type QuizType = 'MIX_UP' | 'MULTIPLE_CHOICE'

type QuizItem = {
  id: number
  question: string
  answer: string
  explanation: string
  options?: string[]
  quizType: QuizType
}

type DocumentBase = {
  id: number
  documentType: CreateType
  status: DocumentStatus
  totalQuizCount: number
  characterCount: number
  directory: DirectoryInDocument
  updatedAt: string
}

type DocumentDetailItem = DocumentBase & {
  documentName: string
  content: string
  quizzes: QuizItem[]
}

type DocumentListItem = DocumentBase & {
  name: string
  documentType: CreateType
  previewContent: string
  createdAt: string
  reviewNeededQuizCount: number
}

type SearchedDocument = {
  documentId: number
  documentName: string
  content: string
  directory: DirectoryInDocument
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

declare namespace Document {
  type DetailItem = DocumentDetailItem
  type ItemInList = DocumentListItem
  type List = DocumentListItem[]
  type Status = DocumentStatus
  type Sort = SortOption

  declare namespace Request {
    /** PATCH /api/v2/documents/{document_id}/update-name
     * 문서 이름 변경
     */
    type UpdateName = DeepRequired<
      paths['/api/v2/documents/{document_id}/update-name']['patch']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** PATCH /api/v2/documents/{document_id}/update-content
     * 문서 내용 업데이트
     */
    type UpdateContent = DeepRequired<components['schemas']['UpdateDocumentContentRequest']>

    /** PATCH /api/v2/documents/today-quiz-settings
     * 오늘의 퀴즈 관리(문제를 가져올 노트 선택)
     */
    type UpdateTodayQuizSettings = DeepRequired<
      paths['/api/v2/documents/today-quiz-settings']['patch']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** PATCH /api/v2/documents/move
     * 문서 다른 폴더로 옮기기
     */
    type MoveDocument = DeepRequired<
      paths['/api/v2/documents/move']['patch']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** POST /api/v2/integrated-search
     * 통합(문서, 컬렉션, 퀴즈) 검색
     */
    type IntegratedSearch = DeepRequired<
      paths['/api/v2/integrated-search']['post']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** POST /api/v2/documents
     * 문서 생성
     */
    type CreateDocument = DeepRequired<components['schemas']['CreateDocumentRequest']>

    /** POST /api/v2/documents/search
     * 문서 검색
     */
    type SearchDocuments = DeepRequired<
      paths['/api/v2/documents/search']['post']['requestBody']['content']['application/json;charset=UTF-8']
    >

    /** DELETE /api/v2/documents/delete-documents
     * 문서 삭제
     */
    type DeleteDocuments = DeepRequired<
      paths['/api/v2/documents/delete-documents']['delete']['requestBody']['content']['application/json;charset=UTF-8']
    >
  }

  declare namespace Response {
    /** GET /api/v2/documents/{document_id}
     * document_id로 문서 가져오기
     */
    type GetDocument = DeepRequired<
      paths['/api/v2/documents/{document_id}']['get']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** GET /api/v2/documents/review-need-documents
     * 복습 필수 노트 top 5
     */
    type GetReviewNeedDocuments = DeepRequired<
      paths['/api/v2/documents/review-need-documents']['get']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** GET /api/v2/directories/documents
     * 모든 문서 가져오기
     */
    type GetAllDocuments = DeepRequired<
      paths['/api/v2/directories/documents']['get']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** POST /api/v2/integrated-search
     * 통합(문서, 컬렉션, 퀴즈) 검색
     */
    type IntegratedSearch = DeepRequired<
      paths['/api/v2/integrated-search']['post']['responses']['200']['content']['application/json;charset=UTF-8']
    >

    /** POST /api/v2/documents
     * 문서 생성
     */
    type CreateDocument = DeepRequired<components['schemas']['CreateDocumentRequest']>

    /** POST /api/v2/documents/search
     * 문서 검색
     */
    type SearchDocuments = DeepRequired<
      paths['/api/v2/documents/search']['post']['responses']['200']['content']['application/json;charset=UTF-8']
    >
  }
}
