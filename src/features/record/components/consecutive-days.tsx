import Text from '@/shared/components/ui/text'
import ConsecutiveTooltip from './consecutive-tooltip'

interface Props {
  currentConsecutiveDays: number
  maxConsecutiveDays: number
}

const ConsecutiveDays = ({ currentConsecutiveDays, maxConsecutiveDays }: Props) => {
  return (
    <div className="flex-center flex-col gap-[8px] border-b border-border-divider pb-[20px] pt-[10px]">
      <div className="flex items-center gap-[8px]">
        <Text typography="title3">
          <Text as={'span'} color="accent">
            {currentConsecutiveDays}
          </Text>
          일 연속으로 푸는 중
        </Text>

        <ConsecutiveTooltip />
      </div>

      <Text typography="text1-medium" color="caption">
        최장 연속일: {maxConsecutiveDays}일
      </Text>
    </div>
  )
}

export default ConsecutiveDays
