import Icon from '@/shared/components/icon'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  rank: number
  redirectUrl: string
  title: string
  categoryName: string
  wrongCount: number
}

export const FrequentlyWrongNoteItem = ({
  rank,
  redirectUrl,
  title,
  categoryName,
  wrongCount,
  className,
}: Props) => {
  return (
    <div className={cn(className)}>
      <Link
        href={redirectUrl}
        className="flex h-[62px] items-center justify-between border-b border-gray-01 px-[12px] last:border-none"
      >
        <div className="flex items-center gap-[16px]">
          <span className="text-body2-bold text-orange-06">{rank}</span>
          <div className="flex flex-col gap-[4px]">
            <div className="line-clamp-1 text-body1-medium text-gray-08">{title}</div>
            <div className="line-clamp-1 text-small1-regular text-gray-06">{categoryName}</div>
          </div>
        </div>
        <div className="flex shrink-0 gap-[40px] pl-[12px]">
          <div className="text-body2-medium text-orange-05">오답 {wrongCount}회</div>
          <Icon name="chevron-right" className="h-[10px] w-[6px]" />
        </div>
      </Link>
    </div>
  )
}
