import { CategoryTagType } from './components/category-tag'

// TODO: data interface 백엔드와 협의 필요
interface Document {
  id: number
  name: string
  order: number
  // quizCreation: 'PREPARING' | 'ON' | 'OFF'
}

export interface Category {
  id: number
  tag: CategoryTagType
  emoji: string
  name: string
  documents: Document[]
}

export const userData = {
  id: 1,
  nickname: '픽토스',
  email: 'pictoss@pick.com',
  stars: 20,
}

export const categories: Category[] = [
  {
    id: 1,
    tag: 'IT',
    emoji: '✈️',
    name: '코딩 아카데미',
    documents: [
      {
        id: 0,
        name: '모던 리액트 딥다이브 정리',
        order: 0,
      },
      {
        id: 1,
        name: '모던 자바스크립트 딥다이브 정리',
        order: 1,
      },
    ],
  },
  {
    id: 2,
    tag: 'ECONOMY',
    emoji: '📌',
    name: '전공 공부',
    documents: [
      {
        id: 2,
        name: '제무제표 분석하기',
        order: 0,
      },
      {
        id: 3,
        name: '회계 원리',
        order: 1,
      },
    ],
  },
  {
    id: 3,
    tag: 'IT',
    emoji: '💻',
    name: '알고리즘 공부',
    documents: [
      {
        id: 4,
        name: '돌다리 건너기 문제',
        order: 0,
      },
      {
        id: 5,
        name: '카카오 기출 문제',
        order: 0,
      },
      {
        id: 6,
        name: '피보나치 수열',
        order: 0,
      },
    ],
  },
  {
    id: 4,
    tag: 'HISTORY',
    emoji: '💩',
    name: '철학입문',
    documents: [
      {
        id: 7,
        name: '철학이 본 예술 독후감',
        order: 0,
      },
      {
        id: 8,
        name: '서양 미학사의 거장들',
        order: 0,
      },
    ],
  },
]
