type Category = {
  id: Collection.Field
  name: string
  emoji: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'IT',
    name: 'IT·프로그래밍',
    emoji: '🤖',
    color: '#4B7FF9',
  },
  {
    id: 'LAW',
    name: '법학',
    emoji: '📖',
    color: '#464646',
  },
  {
    id: 'BUSINESS_ECONOMY',
    name: '경영·경제',
    emoji: '💰',
    color: '#F8623F',
  },
  {
    id: 'SOCIETY_POLITICS',
    name: '사회·정치',
    emoji: '⚖️',
    color: '#FFC466',
  },
  {
    id: 'LANGUAGE',
    name: '언어',
    emoji: '💬',
    color: '#FF81A9',
  },
  {
    id: 'MEDICINE_PHARMACY',
    name: '의학·약학',
    emoji: '🩺',
    color: '#7DCF6E',
  },
  {
    id: 'ART',
    name: '예술',
    emoji: '🎨',
    color: '#AC86FF',
  },
  {
    id: 'SCIENCE_ENGINEERING',
    name: '과학·공학',
    emoji: '🔬',
    color: '#1C49DC',
  },
  {
    id: 'HISTORY_PHILOSOPHY',
    name: '역사·철학',
    emoji: '📜',
    color: '#9B856A',
  },
  {
    id: 'OTHER',
    name: '기타',
    emoji: '♾️',
    color: '#D3D3D3',
  },
]
