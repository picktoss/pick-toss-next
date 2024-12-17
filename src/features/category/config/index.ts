type Category = {
  id: Collection.Field
  name: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'IT',
    name: 'IT·프로그래밍',
    emoji: '🤖',
  },
  {
    id: 'LAW',
    name: '법률·정치',
    emoji: '📖',
  },
  {
    id: 'BUSINESS_ECONOMY',
    name: '경제·경영',
    emoji: '💰',
  },
  {
    id: 'SOCIETY_POLITICS',
    name: '사회·정치',
    emoji: '⚖️',
  },
  {
    id: 'LANGUAGE',
    name: '언어',
    emoji: '💬',
  },
  {
    id: 'MEDICINE_PHARMACY',
    name: '의학·약학',
    emoji: '🩺',
  },
  {
    id: 'ART',
    name: '예술',
    emoji: '🎨',
  },
  {
    id: 'SCIENCE_ENGINEERING',
    name: '과학·공학',
    emoji: '🔬',
  },
  {
    id: 'HISTORY_PHILOSOPHY',
    name: '역사·철학',
    emoji: '📜',
  },
  {
    id: 'OTHER',
    name: '기타',
    emoji: '♾️',
  },
]
