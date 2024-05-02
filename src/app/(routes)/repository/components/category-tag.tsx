import { cn } from '@/lib/utils'

export type CategoryTagType =
  | 'IT'
  | 'ECONOMY'
  | 'HISTORY'
  | 'LANGUAGE'
  | 'MATH'
  | 'ETC'
  | 'ART'
  | 'MEDICINE'

const tagVariant: {
  style: Record<CategoryTagType, string>
  text: Record<CategoryTagType, string>
} = {
  style: {
    IT: 'bg-[#E2F0F9] text-[#3C7BD9]',
    ECONOMY: 'bg-[#FFF7CA] text-[#D97E3C]',
    HISTORY: 'bg-[#EAEAEA] text-[#525252]',
    LANGUAGE: 'bg-[#FFD3CE] text-[#DF3535]',
    MATH: 'bg-[#E0FBF5] text-[#5BC2C2]',
    ART: 'bg-[#EFDBFF] text-[#B663DD]',
    MEDICINE: 'bg-[#E7FFDB] text-[#5F9F0D]',
    ETC: 'bg-[#D9D9D9] text-[#000000]',
  },
  text: {
    IT: 'IT·개발',
    ECONOMY: '경영·경제',
    HISTORY: '역사·철학',
    LANGUAGE: '언어',
    MATH: '수학',
    ART: '예술',
    MEDICINE: '의료·과학',
    ETC: '기타',
  },
}

interface Props {
  tag: CategoryTagType
}

export default function CategoryTag({ tag }: Props) {
  return (
    <span className={cn('rounded-md px-2 py-1 text-[10px]', tagVariant.style[tag])}>
      {tagVariant.text[tag]}
    </span>
  )
}
