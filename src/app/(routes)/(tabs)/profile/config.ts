export const profileConfig = {
  userConfig: {
    name: '사용자 설정',
    items: [
      {
        id: 'notification-config',
        label: '알림 설정',
        href: '/profile/notification',
        disabled: false,
      },
      {
        id: 'subscription',
        label: '구독 및 결제',
        href: '#',
        disabled: true,
      },
      {
        id: 'invite',
        label: '친구 코드 입력',
        href: '#',
        disabled: true,
      },
    ],
  },
  appConfig: {
    name: '앱 설정',
    items: [
      {
        id: 'languages-and-regions',
        label: '언어와 지역',
        href: '#',
        disabled: true,
      },
      {
        id: 'import-notes',
        label: '노트 가져오기',
        href: '#',
        disabled: true,
      },
    ],
  },
  inApp: {
    items: [
      {
        id: 'contact',
        label: '문의하기',
        href: '/contact',
        disabled: false,
      },
      {
        id: 'policy',
        label: '정책 및 이용약관',
        href: '/policy',
        disabled: false,
      },
    ],
  },
}
