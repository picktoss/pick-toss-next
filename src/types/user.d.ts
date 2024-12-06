type interestedCategory =
  | 'IT'
  | 'LAW'
  | 'ART'
  | 'ECONOMY'
  | 'HISTORY'
  | 'LANGUAGE'
  | 'SOCIETY'
  | 'MEDICINE'
  | 'SCIENCE'
  | 'ETC'

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

interface UpdateTodayQuizCountPayload {
  todayQuizCount: number
}

interface UpdateQuizNotificationPayload {
  quizNotificationEnabled: boolean
}

interface UpdateNamePayload {
  name: string
}

interface UpdateCollectionFieldsPayload {
  interestCollectionFields: interestedCategory[]
}

declare namespace User {
  type Info = UserInfo

  declare namespace Request {
    /** PATCH /api/v2/members/update-today-quiz-count
     * 오늘의 퀴즈 관리(오늘의 퀴즈 개수 설정)
     */
    type UpdateTodayQuizCount = UpdateTodayQuizCountPayload

    /** PATCH /api/v2/members/update-quiz-notification
     * 사용자 퀴즈 알림 ON/OFF
     */
    type UpdateQuizNotification = UpdateQuizNotificationPayload

    /** PATCH /api/v2/members/update-name
     * 사용자 이름 수정
     */
    type UpdateName = UpdateNamePayload

    /** PATCH /api/v2/members/update-collection-fields
     * 관심분야 태그 설정
     */
    type UpdateCollectionFields = UpdateCollectionFieldsPayload
  }
}
