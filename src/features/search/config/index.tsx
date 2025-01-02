export const SEARCH_TABS = {
  ALL: 'all',
  QUIZ_NOTE: 'quiz-note',
  COLLECTION: 'collection',
} as const

// 통합검색 탭 타입
export type SearchTab = 'all' | 'quiz-note' | 'collection'

export const mockCollectionList = [
  {
    id: 0,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
  {
    id: 1,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
  {
    id: 2,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
  {
    id: 3,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
  {
    id: 4,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
  {
    id: 5,
    name: '파이썬 OX 퀴즈',
    collectionCategory: 'IT',
    quizCount: 35,
    bookmarkCount: 123,
    emoji: '🔥',
    memberName: '픽토스',
  },
] as Collection.SearchedCollection[]
