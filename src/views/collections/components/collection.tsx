import CategoryTag from '@/shared/components/category-tag'
import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  emoji: string
  title: string
  category: string
  problemCount: number
  lastUpdated: string
  isBookMarked: boolean
  bookMarkCount: number
  href: string
}

const Collection = ({
  emoji,
  title,
  category,
  problemCount,
  lastUpdated,
  href,
  isBookMarked,
  bookMarkCount,
  className,
}: Props) => {
  return (
    <div className={cn('min-w-[166px]', className)}>
      <Link
        href={href}
        className="relative inline-block h-[200px] w-full rounded-[16px] bg-background-base-01 px-[20px] pt-[19px]"
      >
        <div className="absolute right-[16px] top-[20px] flex flex-col items-center gap-[4px]">
          {isBookMarked ? <Icon name="book-mark-fill" /> : <Icon name="book-mark" />}
          <Text typography="text2-medium" className="text-text-caption">
            {bookMarkCount}
          </Text>
        </div>
        <div className="text-[36px] leading-[120%] tracking-[-0.02em]">{emoji}</div>
        <div className="mt-[10px] line-clamp-2">
          <Text typography="subtitle2-bold">{title}</Text>
        </div>
        <h3 className="mt-[8px]">
          <CategoryTag title={category} />
        </h3>
        <div className="mt-[16px] flex items-center gap-[8px]">
          <Text typography="text2-medium" className="text-text-secondary">
            {problemCount} 문제
          </Text>
          <Text typography="caption-medium" className="text-text-caption">
            {lastUpdated} 업데이트
          </Text>
        </div>
      </Link>
    </div>
  )
}

export default Collection
