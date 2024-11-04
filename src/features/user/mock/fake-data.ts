/* eslint-disable @typescript-eslint/no-unused-vars */
interface StarHistoryListItem {
  id: string
  type: 'payment' | 'reward' | 'expend'
  star: number
  content: string
  description: string
  detail?: string // 주문 상세 - 결제 피드백과 맞춰봐야 함
}

interface StarHistoryDateItem {
  date: string
  list: StarHistoryListItem[]
}

// export const fakeData: StarHistoryDateItem[] = []

export const fakeData: StarHistoryDateItem[] = [
  {
    date: '2024.10.15',
    list: [
      {
        id: '0',
        type: 'reward',
        star: 5,
        content: '친구 초대 보상',
        description: '추천인 코드: 27d232',
      },
      {
        id: '1',
        type: 'reward',
        star: 5,
        content: '오늘의 퀴즈 보상',
        description: '연속 2일 출석 완료',
      },
      {
        id: '2',
        type: 'expend',
        star: 30,
        content: '30문제 생성',
        description: '전공 공부 > 중간고사',
      },
    ],
  },
  {
    date: '2024.10.13',
    list: [
      {
        id: '3',
        type: 'payment',
        star: 20,
        content: '별 20개 구매',
        description: '토스페이 2,500원 결제',
        detail: '주문 상세',
      },
      {
        id: '4',
        type: 'expend',
        star: 5,
        content: '5문제 생성',
        description: '전공 공부 > 중간고사',
      },
    ],
  },
  {
    date: '2024.10.12',
    list: [
      {
        id: '5',
        type: 'payment',
        star: 20,
        content: '별 20개 구매',
        description: '토스페이 2,500원 결제',
        detail: '주문 상세',
      },
      {
        id: '6',
        type: 'expend',
        star: 5,
        content: '5문제 생성',
        description: '전공 공부 > 중간고사',
      },
    ],
  },
]
