import DatePicker from '@/features/analysis/components/date-picker'
import TotalSolvedToday from '@/features/analysis/components/total-solved-today'
import WeekAndMonthTab from '@/features/analysis/components/week-and-month-tab'

interface Props {
  searchParams: {
    date?: string
    tab?: 'week' | 'month'
  }
}

const AnalysisPage = ({ searchParams }: Props) => {
  const { date, tab } = searchParams

  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto">
      <div className="flex-center flex-col pb-[29px]">
        <DatePicker date={date} />
        <TotalSolvedToday quizCount={15} totalElapsedTime={622000} />
      </div>

      <div className="h-[8px] w-full bg-background-base-02"></div>

      <div className="flex flex-col px-[16px] py-[24px]">
        <WeekAndMonthTab tab={tab} />
      </div>
    </main>
  )
}

export default AnalysisPage
