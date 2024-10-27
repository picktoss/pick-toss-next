import DayItem from '../day-item'

const DayCheck = () => {
  const fakeCheckData = [
    { day: 1, isComplete: true },
    { day: 2, isComplete: true },
    { day: 3, isComplete: false },
    { day: 4, isComplete: false },
    { day: 5, isComplete: false },
  ]

  return (
    <div className="flex-center mt-[32px] h-fit w-full gap-[16px] rounded-[20px] bg-background-base-02 px-[40px] pb-[23px] pt-[16px]">
      {fakeCheckData.map(({ day, isComplete }) => (
        <DayItem key={day} day={day} isComplete={isComplete} isLast={day === 5} />
      ))}
    </div>
  )
}

export default DayCheck
