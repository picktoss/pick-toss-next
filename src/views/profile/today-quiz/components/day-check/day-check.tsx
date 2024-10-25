import DayItem from '../day-item/day-item'

const DayCheck = () => {
  const fakeCheckData = [
    { day: 1, isComplete: true },
    { day: 2, isComplete: true },
    { day: 3, isComplete: false },
    { day: 4, isComplete: false },
    { day: 5, isComplete: false },
  ]

  return (
    <div className="h-fit w-full bg-background-base-02 rounded-[20px] px-[40px] pt-[16px] pb-[23px] flex-center gap-[16px] mt-[32px]">
      {fakeCheckData.map(({ day, isComplete }) => (
        <DayItem key={day} day={day} isComplete={isComplete} isLast={day === 5} />
      ))}
    </div>
  )
}

export default DayCheck
