export const PROFILE_MENU_LIST = {
  userSetting: [
    {
      key: 'account',
      label: '계정 정보',
      href: 'profile/account',
    },
    {
      key: 'notification',
      label: '알림 설정',
      href: 'profile/notification',
    },
    {
      key: 'todayQuiz',
      label: '오늘의 퀴즈 관리',
      href: 'profile/today-quiz',
    },
  ],
  star: [
    {
      key: 'starHistory',
      label: '결제/사용/적립 내역',
      href: 'profile/star-history',
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
