import { CategoryTagType } from '@/apis/fetchers/category/get-categories'
import { cn } from '@/lib/utils'

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
    DEFAULT: 'bg-[#D9D9D9] text-[#000000]',
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
    DEFAULT: '기본',
  },
}

interface Props {
  tag: CategoryTagType
  className?: string
}

export default function CategoryTag({ tag, className }: Props) {
  return (
    <span
      className={cn(
        'whitespace-nowrap flex justify-center items-center h-[19px] rounded-[4px] px-2 text-[10px]',
        tagVariant.style[tag],
        className
      )}
    >
      {tagVariant.text[tag]}
    </span>
  )
}
