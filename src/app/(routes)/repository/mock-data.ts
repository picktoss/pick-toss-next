import { CategoryTagType } from './components/category-tag'

interface StudyCategory {
  id: number
  tag: CategoryTagType
  emoji: string
  name: string
  documents: unknown[]
}

export const userData = {
  id: 1,
  nickname: '픽토스',
  email: 'pictoss@pick.com',
  stars: 20,
}

export const studyCategoryData: StudyCategory[] = [
  {
    id: 1,
    tag: 'IT',
    emoji: '✈️',
    name: '코딩 아카데미',
    documents: [
      {
        id: 0,
        name: 'string',
        order: 0,
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
        id: 0,
        name: 'string',
        order: 0,
      },
      {
        id: 0,
        name: 'string',
        order: 0,
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
        id: 0,
        name: 'string',
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
        id: 0,
        name: 'string',
        order: 0,
      },
      {
        id: 0,
        name: 'string',
        order: 0,
      },
    ],
  },
]
