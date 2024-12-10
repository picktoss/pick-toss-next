import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

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

declare global {
  declare namespace Collection {
    type Item = DeepRequired<components['schemas']['CollectionDto']>
    type Field = CollectionField

    type SearchedCollection = DeepRequired<components['schemas']['IntegratedSearchCollectionDto']>

    declare namespace Request {
      /** PATCH /api/v2/collections/{collection_id}/update-quizzes
       * 컬렉션 문제 편집
       */
      type UpdateQuizzes = DeepRequired<
        paths['/api/v2/collections/{collection_id}/update-quizzes']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/collections/{collection_id}/update-info
       * 컬렉션 정보 수정
       */
      type UpdateInfo = DeepRequired<
        paths['/api/v2/collections/{collection_id}/update-info']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/collection/{collection_id}/add-quiz
       * 컬렉션에 퀴즈 추가
       */
      type AddQuiz = DeepRequired<
        paths['/api/v2/collection/{collection_id}/add-quiz']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/collections
       * 컬렉션 생성
       */
      type CreateCollection = DeepRequired<
        paths['/api/v2/collections']['post']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }

    declare namespace Response {
      /** GET /api/v2/collections
       * 모든 컬렉션 가져오기(탐색)
       */
      type GetAllCollections = DeepRequired<
        paths['/api/v2/collections']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections/{keyword}
       * 컬렉션 검색하기
       */
      type GetCollectionsByKeyword = DeepRequired<
        paths['/api/v2/collections/{keyword}']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections/{collection_id}/info
       * 만든 컬렉션 상세 정보 가져오기
       */
      type GetCollectionInfo = DeepRequired<
        paths['/api/v2/collections/{collection_id}/info']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections/my-collections
       * 직접 생성한 컬렉션 가져오기
       */
      type GetMyCollections = DeepRequired<
        paths['/api/v2/collections/my-collections']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections/interest-category-collection
       * 사용자 관심 분야 컬렉션 가져오기
       */
      type GetInterestFieldCollections = DeepRequired<
        paths['/api/v2/collections/interest-category-collection']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections/bookmarked-collections
       * 북마크한 컬렉션 가져오기
       */
      type GetBookmarkedCollections = DeepRequired<
        paths['/api/v2/collections/bookmarked-collections']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** GET /api/v2/collections-analysis
       * 컬렉션 분석
       */
      type GetCollectionsAnalysis = DeepRequired<
        paths['/api/v2/collections-analysis']['get']['responses']['200']['content']['application/json;charset=UTF-8']
      >

      /** POST /api/v2/collections
       * 컬렉션 생성
       */
      type CreateCollection = DeepRequired<
        paths['/api/v2/collections']['post']['responses']['201']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
