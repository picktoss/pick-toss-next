import { DeepRequired } from 'react-hook-form'
import { components, paths } from './schema'

declare global {
  declare namespace User {
    type Info = DeepRequired<components['schemas']['GetMemberInfoResponse']>
    type InterestedCategory = DeepRequired<
      components['schemas']['GetCollectionCategoriesDto']['collectionCategory']
    >

    declare namespace Request {
      /** PATCH /api/v2/members/update-today-quiz-count
       * 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정)
       */
      type UpdateTodayQuizCount = DeepRequired<
        paths['/api/v2/members/update-today-quiz-count']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/members/update-quiz-notification
       * 사용자 퀴즈 알림 ON/OFF
       */
      type UpdateQuizNotification = DeepRequired<
        paths['/api/v2/members/update-quiz-notification']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/members/update-name
       * 사용자 이름 수정
       */
      type UpdateName = DeepRequired<
        paths['/api/v2/members/update-name']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** PATCH /api/v2/members/update-collection-fields
       * 관심분야 태그 설정
       */
      type UpdateCollectionCategories = DeepRequired<
        paths['/api/v2/members/update-collection-categories']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >

      /** DELETE /api/v2/members/withdrawal
       * 회원 탈퇴
       */
      type DeleteAccount = DeepRequired<
        paths['/api/v2/members/withdrawal']['delete']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
