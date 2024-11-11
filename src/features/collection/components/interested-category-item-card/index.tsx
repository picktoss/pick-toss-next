import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

interface Props {
  emoji: string
  title: string
  isBookmarked: boolean
  bookmarkCount: number
  quizCount: number
}

const InterestedCategoryItemCard = ({
  emoji,
  title,
  isBookmarked,
  bookmarkCount,
  quizCount,
}: Props) => {
  return (
    <div
      className={cn(
        'flex h-fit w-[150px] flex-col gap-[18px] rounded-[20px] bg-background-base-01 px-[20px] py-[16px]'
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-suit text-[36px]">{emoji}</span>
        <div className="flex flex-col items-center">
          {isBookmarked ? (
            <Icon name="book-mark-fill" className="size-[20px] text-icon-tertiary" />
          ) : (
            <Icon name="book-mark" className="size-[20px] text-icon-tertiary" />
          )}
          <Text typography="text2-medium" color="caption">
            {bookmarkCount}
          </Text>
        </div>
      </div>

      <div className="mb-[6px] flex flex-col gap-[4px]">
        <Text typography="subtitle2-bold" className="w-full truncate">
          {title}
        </Text>
        <Text typography="text2-medium" color="secondary">
          {quizCount} 문제
        </Text>
      </div>
    </div>
  )
}

export default InterestedCategoryItemCard
