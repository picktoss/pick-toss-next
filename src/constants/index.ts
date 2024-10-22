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
    key: 'it',
    label: 'IT·프로그래밍',
  },
  {
    key: 'law',
    label: '법학',
  },
  {
    key: 'business',
    label: '경영·경제',
  },
  {
    key: 'social',
    label: '사회·정치',
  },
  {
    key: 'language',
    label: '언어',
  },
  {
    key: 'medicine',
    label: '의학·약학',
  },
  {
    key: 'art',
    label: '예술',
  },
  {
    key: 'science',
    label: '과학·공학',
  },
  {
    key: 'history',
    label: '역사·철학',
  },
  {
    key: 'etc',
    label: '기타',
  },
]
