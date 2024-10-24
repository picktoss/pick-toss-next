import Icon from '@/shared/components/icon'
import Text from '@/shared/components/ui/text'

interface Props {
  day: number
  isComplete: boolean
  isLast?: boolean
}

const DayItem = ({ day, isComplete, isLast }: Props) => {
  // 추후 단가 측정 후 변경될 수 있음
  const REWARD = 5
  const LAST_REWARD = 20

  return (
    <div className="flex-center flex-col">
      <Text typography="text1-medium" className="text-text-caption">
        {day}일
      </Text>

      {isComplete ? (
        <div className="size-[40px] bg-fill-secondary-orange rounded-full flex-center mt-[8px]">
          <Icon name="check-round" className="text-white" />
        </div>
      ) : (
        <div className="size-[40px] rounded-full flex-center mt-[8px] bg-[#EAECEF]">
          <Text typography="text2-bold" className={isLast ? 'text-[#FB7E20]' : 'text-[#797D81]'}>
            +{isLast ? LAST_REWARD : REWARD}
          </Text>
        </div>
      )}
    </div>
  )
}

export default DayItem
