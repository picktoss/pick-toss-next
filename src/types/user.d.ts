import { DeepRequired } from 'react-hook-form'
import { paths } from './schema'

type interestedCategory =
  | 'IT'
  | 'LAW'
  | 'ART'
  | 'BUSINESS_ECONOMY'
  | 'HISTORY_PHILOSOPHY'
  | 'LANGUAGE'
  | 'SOCIETY_POLITICS'
  | 'MEDICINE_PHARMACY'
  | 'SCIENCE_ENGINEERING'
  | 'OTHER'

interface UserInfo {
  id: number
  name: string
  email: string
  socialPlatform: 'KAKAO' | 'GOOGLE'
  role: 'ROLE_USER' | 'ROLE_ADMIN'
  interestField: interestedCategory[]
  documentUsage: {
    possessDocumentCount: number
    maxPossessDocumentCount: number
  }
  star: number
  quizNotificationEnabled: boolean
}

declare global {
  declare namespace User {
    type Info = UserInfo

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
      type UpdateCollectionFields = DeepRequired<
        paths['/api/v2/members/update-collection-categories']['patch']['requestBody']['content']['application/json;charset=UTF-8']
      >
    }
  }
}
