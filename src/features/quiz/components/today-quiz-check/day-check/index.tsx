import DayItem from '../day-item'

interface Props {
  checkData: { day: number; isComplete: boolean }[]
  currentConsecutiveDays?: number
}

const DayCheck = ({ checkData, currentConsecutiveDays }: Props) => {
  return (
    <div className="flex-center mt-[32px] h-fit w-full gap-[16px] rounded-[20px] bg-background-base-02 px-[40px] pb-[23px] pt-[16px]">
      {checkData.map(({ day, isComplete }) => (
        <DayItem
          key={day}
          day={day}
          isComplete={isComplete}
          isLast={day === 5}
          isReward={currentConsecutiveDays ? day === currentConsecutiveDays + 1 : false}
        />
      ))}
    </div>
  )
}

export default DayCheck
