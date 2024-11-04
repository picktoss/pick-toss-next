import DayItem from '../day-item'

const DayCheck = ({ checkData }: { checkData: { day: number; isComplete: boolean }[] }) => {
  return (
    <div className="flex-center mt-[32px] h-fit w-full gap-[16px] rounded-[20px] bg-background-base-02 px-[40px] pb-[23px] pt-[16px]">
      {checkData.map(({ day, isComplete }) => (
        <DayItem key={day} day={day} isComplete={isComplete} isLast={day === 5} />
      ))}
    </div>
  )
}

export default DayCheck
