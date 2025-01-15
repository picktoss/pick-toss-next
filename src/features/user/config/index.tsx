export const PROFILE_MENU_LIST = {
  userSetting: [
    {
      key: 'account',
      label: '계정 정보',
      href: 'profile/account',
    },
    {
      key: 'notification-setting',
      label: '알림 설정',
      href: 'profile/notification-setting',
    },
    // {
    //   key: 'todayQuizSetting',
    //   label: '오늘의 퀴즈 관리',
    //   href: 'profile/today-quiz-setting',
    // },
  ],
  star: [
    {
      key: 'subscribe',
      label: '구독/결제 내역',
      href: 'profile/subscribe',
    },
  ],
  service: [
    {
      key: 'announcement',
      label: '공지사항',
      href: 'profile/announcement',
    },
    {
      key: 'inquiry',
      label: '문의하기',
      href: 'profile/inquiry',
    },
    {
      key: 'FAQ',
      label: '자주 묻는 질문',
      href: 'profile/FAQ',
    },
    {
      key: 'policy',
      label: '정책 및 이용약관',
      href: 'profile/policy',
    },
  ],
} as const

export const RESIGN_OPTIONS = [
  {
    key: 'UNSATISFACTORY_RESULTS',
    label: '생성한 결과물이 만족스럽지 않아요',
  },
  {
    key: 'INCONVENIENT_SERVICE',
    label: '기능 등 서비스 이용이 불편해요',
  },
  {
    key: 'MANY_SYSTEM_ERRORS',
    label: '접속 오류 등 시스템 이용이 불편해요',
  },
  {
    key: 'SECURITY_CONCERNS',
    label: '개인정보 및 보안이 걱정돼요',
  },
] as const
