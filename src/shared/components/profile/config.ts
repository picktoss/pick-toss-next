type ProfileNav = {
  id: string
  name: string
  items: {
    id: 'my-account' | 'notification-config' | '1-3' | '1-4' | '2-1' | '2-2'
    label: string
    disabled: boolean
  }[]
  styles: string
}[]

export type NavItemsId = ProfileNav[number]['items'][number]['id']

export const profileNav: ProfileNav = [
  {
    id: '1',
    name: '사용자 설정',
    items: [
      {
        id: 'my-account',
        label: '내 계정',
        disabled: false,
      },
      {
        id: 'notification-config',
        label: '알림 설정',
        disabled: false,
      },
      {
        id: '1-3',
        label: '구독 및 결제',
        disabled: true,
      },
      {
        id: '1-4',
        label: '친구 코드 입력',
        disabled: true,
      },
    ],
    styles: 'pb-[18px]',
  },
  {
    id: '2',
    name: '앱 설정',
    items: [
      {
        id: '2-1',
        label: '언어와 지역',
        disabled: true,
      },
      {
        id: '2-2',
        label: '문서 가져오기',
        disabled: true,
      },
    ],
    styles: 'pt-[16px] pb-[9px]',
  },
]
