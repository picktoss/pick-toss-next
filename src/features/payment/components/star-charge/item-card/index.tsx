import { Button } from '@/shared/components/ui/button'
import Tag from '@/shared/components/ui/tag'
import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'

interface Props {
  image: React.ReactNode
  tagMessage?: string
  starCount: number
  bonusCount?: number
  paymentAmount: number
  isFirst?: boolean
}

const ItemCard = ({ image, tagMessage, starCount, bonusCount, paymentAmount, isFirst }: Props) => {
  return (
    <div
      className={cn(
        'flex size-fit flex-col items-center gap-[29px] rounded-[16px] border border-border-default bg-background-base-01 p-[17px]',
        isFirst && 'ml-[16px]'
      )}
    >
      <div className="relative">
        {image}

        {tagMessage && (
          <Tag colors={'secondary'} className="absolute bottom-[-8px] right-1/2 translate-x-1/2">
            {tagMessage}
          </Tag>
        )}
      </div>

      <div className="flex flex-col items-center gap-[9px]">
        <Text typography="title3">
          {starCount}{' '}
          {bonusCount && (
            <Text as={'span'} color="accent">
              +{bonusCount}
            </Text>
          )}
          개
        </Text>
        <Button variant={'mediumRound'} colors={'primary'} className="w-full">
          {paymentAmount.toLocaleString()} 원
        </Button>
      </div>
    </div>
  )
}

export default ItemCard
