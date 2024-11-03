import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

interface Props {
  isLast: boolean
  type: 'payment' | 'reward' | 'expend'
  star: number
  content: string
  description: string
  detail?: string // 주문 상세 - 결제 피드백과 맞춰봐야 함
}

const ListItem = ({ isLast, type, star, content, description, detail }: Props) => {
  const plusOrMinus = type === 'payment' || type === 'reward' ? '+' : '-'

  return (
    <div
      className={cn(
        'flex w-full items-center border-b border-border-divider',
        detail && 'justify-between',
        isLast && 'border-none'
      )}
    >
      <div className="flex w-full items-center gap-[17px] py-[16px]">
        <div className="flex w-[55px] items-end gap-[2px]">
          <Icon name="star" className="size-[24px]" />
          <Text
            typography="text2-medium"
            className={cn(
              'text-center',
              plusOrMinus === '+' ? 'text-text-accent' : 'text-text-sub'
            )}
          >
            {plusOrMinus}
            {star}
          </Text>
        </div>

        <div className="flex flex-col gap-[2px]">
          <Text typography="subtitle2-medium">{content}</Text>
          <Text typography="text2-medium" className="text-text-sub">
            {description}
          </Text>
        </div>
      </div>

      {detail && (
        <button className="w-fit shrink-0">
          <Text typography="text2-medium" className="text-text-sub">
            주문 상세
          </Text>
        </button>
      )}
    </div>
  )
}

export default ListItem
