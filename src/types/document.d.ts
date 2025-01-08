import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

type DocumentDetailItem = DeepRequired<components['schemas']['GetSingleDocumentResponse']>
type DocumentItemInList = DeepRequired<components['schemas']['GetAllDocumentsDocumentDto']>

declare global {
  declare namespace Document {
    type DetailItem = DocumentDetailItem
    type ItemInList = DocumentItemInList
    type List = DocumentItemInList[]
    type Sort = 'CREATED_AT' | 'UPDATED_AT'

    type Status = DeepRequired<
      components['schemas']['GetAllDocumentsDocumentDto']['quizGenerationStatus']
    >
    type Type = Exclude<
      DeepRequired<components['schemas']['GetAllDocumentsDocumentDto']['documentType']>,
      undefined
    >

    type SearchedDocument = DeepRequired<components['schemas']['IntegratedSearchDocumentDto']>

    type SearchedDocument = Document.Response.SearchDocuments['documents'][number]
    type SearchedQuiz = Document.Response.SearchDocuments['quizzes'][number]

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
      type CreateDocument = DeepRequired<
        paths['/api/v2/documents']['post']['responses']['201']['content']['application/json']
      >

      /** POST /api/v2/documents/search
       * 문서 검색
       */
      type SearchDocuments = DeepRequired<
        paths['/api/v2/documents/search']['post']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/documents/{document_id}/add-quizzes
       * 문서에서 추가 퀴즈 생성
       */
      type AddQuizzes = DeepRequired<
        paths['/api/v2/documents/{document_id}/add-quizzes']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
