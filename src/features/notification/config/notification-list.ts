// export const NotificationList = []

export type NotificationType = 'TODAY_QUIZ' | 'ANALYSIS' | 'SYSTEM' | 'REWARD'
export const NotificationList = [
  {
    id: 1,
    type: 'TODAY_QUIZ' as NotificationType,
    title: '오늘의 퀴즈 도착',
    content: '복습도 하고 별도 받아가세요!',
    date: '2024-11-14T00:00:00.000',
  },
  {
    id: 2,
    type: 'ANALYSIS' as NotificationType,
    title: '최근 퀴즈 분석',
    content: '내가 푼 문제 수, 정답률은 체크하셨나요?',
    date: '2024-11-13T00:00:00.000',
  },
  {
    id: 3,
    type: 'SYSTEM' as NotificationType,
    title: '이번 주 픽토스 업데이트',
    content: '푸시 알림, 노트 하이라이트 기능이 추가되었어요',
    date: '2024-10-14T00:00:00.000',
  },
  {
    id: 4,
    type: 'REWARD' as NotificationType,
    title: '4일째 퀴즈 푸는 중!',
    content: '내일도 오늘의 퀴즈를 풀면 별을 20개 받아요',
    date: '2024-09-14T00:00:00.000',
  },
]
