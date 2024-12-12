import { CATEGORIES } from '@/features/category/config'
import { useBookmarkMutation } from '@/requests/collection/hooks'
import CategoryTag from '@/shared/components/custom/category-tag'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  collectionId: number
  emoji: string
  title: string
  category: string
  problemCount: number
  lastUpdated: string
  isBookMarked?: boolean
  isOwner?: boolean
  bookMarkCount: number
  creatorName: string
}

const Collection = ({
  collectionId,
  emoji,
  title,
  category,
  problemCount,
  lastUpdated,
  isBookMarked = false,
  isOwner = false,
  bookMarkCount,
  className,
  creatorName,
}: Props) => {
  const { mutate: bookmarkMutate } = useBookmarkMutation()

  const categoryLabel =
    CATEGORIES.find((categoryItem) => categoryItem.code === category)?.name ?? ''

  return (
    <div className={cn('min-w-[166px]', className)}>
      <div className="relative inline-block h-[200px] w-full rounded-[16px] bg-background-base-01 px-[20px] pt-[19px] text-start">
        <div className="absolute right-[16px] top-[20px] flex flex-col items-center gap-[4px]">
          {isOwner && (
            <Icon
              name="book-mark-fill"
              className="size-[24px] text-icon-disabled"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            />
          )}
          {!isOwner &&
            (isBookMarked ? (
              <Icon
                name="book-mark-fill"
                className="size-[24px] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  bookmarkMutate({ collectionId, isBookMarked: true })
                }}
              />
            ) : (
              <Icon
                name="book-mark"
                className="size-[24px] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  bookmarkMutate({ collectionId, isBookMarked: false })
                }}
              />
            ))}
          <Text typography="text2-medium" className="text-text-caption">
            {bookMarkCount}
          </Text>
        </div>

        <div className="text-[36px] leading-[120%] tracking-[-0.02em]">{emoji}</div>

        <div className="mt-[10px] line-clamp-2">
          <Text typography="subtitle2-bold">{title}</Text>
        </div>
        <h3 className="mt-[8px]">
          <CategoryTag title={categoryLabel} />
        </h3>
        <div className="mt-[16px] flex items-center gap-[8px]">
          <Text typography="text2-medium" className="text-text-secondary">
            {problemCount} 문제
          </Text>
          {isOwner ? (
            <Text typography="caption-medium" className="text-text-caption">
              {lastUpdated} 업데이트
            </Text>
          ) : (
            <Text typography="caption-medium" className="text-text-caption">
              {'@'}
              {creatorName}
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
