export const MIN_CONTENT_LENGTH = 800
export const MAX_CONTENT_LENGTH = 15_000

export const SORT_OPTION = ['createdAt', 'name', 'updatedAt'] as const

export const LOCAL_KEY = {
  QUIZ_CREATING: 'quiz-creating',

  SEARCH_PICK: 'search-pick',
  SEARCH_DOCUMENT: 'search-document',
}

export const CATEGORY_OPTION = [
  {
    key: 'IT',
    label: 'IT·프로그래밍',
  },
  {
    key: 'LAW',
    label: '법학',
  },
  {
    key: 'ECONOMY',
    label: '경영·경제',
  },
  {
    key: 'SOCIETY',
    label: '사회·정치',
  },
  {
    key: 'LANGUAGE',
    label: '언어',
  },
  {
    key: 'MEDICINE',
    label: '의학·약학',
  },
  {
    key: 'ART',
    label: '예술',
  },
  {
    key: 'SCIENCE',
    label: '과학·공학',
  },
  {
    key: 'HISTORY',
    label: '역사·철학',
  },
  {
    key: 'ETC',
    label: '기타',
  },
]
