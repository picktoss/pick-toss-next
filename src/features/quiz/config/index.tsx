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
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    options: [
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
      '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
    ],
    answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
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
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    answer: 'correct',
    explanation:
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다 기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
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
    id: 3,
    quizType: 'MULTIPLE_CHOICE',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    options: [
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
      '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이',
      '기존의 배양육이 기존방식에서 육류보다 토양이 비축된다',
    ],
    answer: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
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
    id: 5,
    quizType: 'MIX_UP',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    answer: 'correct',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
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
    id: 4,
    quizType: 'MIX_UP',
    question: '식물기반 단백질 시장에서 대기업의 참여가 늘어나는 이유는 무엇인가요?',
    answer: 'correct',
    explanation: '기존의 배양육이 기존방식에서 생산되는 육류보다 토양이 비축된다',
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
