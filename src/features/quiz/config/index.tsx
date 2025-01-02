export const quizzes: Quiz.Item[] = [
  {
    document: {
      id: 1,
      name: '최근 이슈',
    },
    directory: {
      id: 1,
      name: '전공 공부',
    },
    id: 1,
    quizType: 'MULTIPLE_CHOICE',
    question: '윌리엄 홀만 교수가 제시한 신식품 명명법의 주요 기준이 아닌 것은?',
    options: [
      '소비자가 세포 기반 제품을 기존 제품과 구별할 수 있어야 한다',
      '알레르기가 있는 사람들이 세포 기반 제품을 식별할 수 있도록 해야 한다',
      '세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 한다',
      '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다',
    ],
    answer: '특정한 이미지 또는 감정을 불러일으키는 이름이어야 한다',
    explanation:
      '윌리엄 홀만 교수는 신식품 명명법의 주요 기준이 소비자가 세포 기반 제품을 기존 제품과 구별할 수 있어야 하고, 알레르기가 있는 사람들이 세포 기반 제품을 식별할 수 있도록 해야 하고, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 한다고 말했다.',
  },
  {
    document: {
      id: 1,
      name: '최근 이슈',
    },
    directory: {
      id: 1,
      name: '전공 공부',
    },
    id: 2,
    quizType: 'MIX_UP',
    question:
      '윌리엄 홀만 교수가 제시한 신식품 명명법에서 신식품은 이미지 또는 감정을 불러일으키는 감성적인 이름이어야 한다',
    answer: 'incorrect',
    explanation:
      '윌리엄 홀만 교수는 신식품 명명법의 주요 기준이 소비자가 세포 기반 제품을 기존 제품과 구별할 수 있어야 하고, 알레르기가 있는 사람들이 세포 기반 제품을 식별할 수 있도록 해야 하고, 세포 기반 제품이나 기존 제품을 비하하지 않는 이름이어야 한다고 말했다.',
  },
]

export const tabs = [
  { key: 'exploration', label: '탐색' },
  { key: 'my-collection', label: '내 컬렉션' },
] as const

export const reportOptions = [
  { id: '1', label: '선지 혹은 질문이 보이지 않아요' },
  { id: '2', label: '퀴즈 유형과 질문이 맞지 않아요' },
  { id: '3', label: '퀴즈가 노트와 관련 없는 내용이에요' },
] as const

export const QUIZ_ANIMATION_DURATION = 1
export const UNTIL_EXPLANATION_DRAWER_OPEN = 800

export const todayQuizCheckList = [
  { day: 1, isComplete: false },
  { day: 2, isComplete: false },
  { day: 3, isComplete: false },
  { day: 4, isComplete: false },
  { day: 5, isComplete: false },
]
