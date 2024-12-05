type Category = {
  code: Collection.Field
  name: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  {
    code: 'IT',
    name: 'IT·프로그래밍',
    emoji: '🤖',
  },
  {
    code: 'LAW',
    name: '법률·정치',
    emoji: '📖',
  },
  {
    code: 'BUSINESS_ECONOMY',
    name: '경제·경영',
    emoji: '💰',
  },
  {
    code: 'SOCIETY_POLITICS',
    name: '사회·정치',
    emoji: '⚖️',
  },
  {
    code: 'LANGUAGE',
    name: '언어',
    emoji: '💬',
  },
  {
    code: 'MEDICINE_PHARMACY',
    name: '의학·약학',
    emoji: '🩺',
  },
  {
    code: 'ART',
    name: '예술',
    emoji: '🎨',
  },
  {
    code: 'SCIENCE_ENGINEERING',
    name: '과학·공학',
    emoji: '🔬',
  },
  {
    code: 'HISTORY_PHILOSOPHY',
    name: '역사·철학',
    emoji: '📜',
  },
  {
    code: 'OTHER',
    name: '기타',
    emoji: '♾️',
  },
]
