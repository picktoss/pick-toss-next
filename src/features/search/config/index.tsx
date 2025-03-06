export const SEARCH_TABS = {
  ALL: 'ALL',
  QUIZ_NOTE: 'QUIZ_NOTE',
  COLLECTION: 'COLLECTION',
} as const

// 통합검색 탭 타입
export type SearchTab = 'ALL' | 'QUIZ_NOTE' | 'COLLECTION'

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
