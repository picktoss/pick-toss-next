import AnalysisTab from '@/features/analysis/components/analysis-tab'
import MonthPeriodPicker from '@/features/analysis/components/month-period-picker'
import WeekPeriodPicker from '@/features/analysis/components/week-period-picker'
import WeekGraphContainer from '@/features/analysis/components/week-graph-container'
import MonthGraphContainer from '@/features/analysis/components/month-graph-container'
import CollectionCategoryContainer from '@/features/analysis/components/collection-category-container'
import { monthAnalysisMockData, weekAnalysisMockData } from '@/features/analysis/config'

interface Props {
  searchParams: {
    tab?: 'week' | 'month'
  }
}

// TODO: 서버에 요청해 분석 데이터 가져오기
const AnalysisPage = ({ searchParams }: Props) => {
  const today = new Date()
  const tab = searchParams.tab ?? 'week'

  return (
    <main className="h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden">
      <AnalysisTab />
      {tab === 'week' && <WeekPeriodPicker today={today} />}
      {tab === 'month' && <MonthPeriodPicker today={today} />}

      {tab === 'week' && <WeekGraphContainer data={weekAnalysisMockData} today={today} />}
      {tab === 'month' && <MonthGraphContainer data={monthAnalysisMockData} today={today} />}

      <div className="h-[12px] w-full bg-background-base-02" />

      <CollectionCategoryContainer data={weekAnalysisMockData.quizCountPerCategory} />
    </main>
  )
}

export default AnalysisPage
