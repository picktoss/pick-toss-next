import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { msToFormatMinSec } from '@/shared/utils/time'

interface Props {
  quizCount: number
  totalElapsedTime: number
}

const TotalSolvedToday = ({ quizCount, totalElapsedTime }: Props) => {
  return (
    <>
      <div className="flex items-end gap-[8px] pb-[12px] pt-[20px]">
        <Text typography="hero" color="info">
          {quizCount}
        </Text>
        <Text typography="text1-medium" color="secondary" className="pb-[4px]">
          문제
        </Text>
      </div>

      <div className="flex-center size-fit gap-[4px] rounded-[12px] bg-background-base-02 px-[14px] py-[4px] text-icon-secondary">
        <Icon name="timer" className="mb-[2px] size-[16px]" />
        <Text typography="text1-medium">{msToFormatMinSec(totalElapsedTime)}</Text>
      </div>
    </>
  )
}

export default TotalSolvedToday
