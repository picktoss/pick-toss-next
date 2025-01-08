'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import Loading from '@/shared/components/custom/loading'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { formatToYYYYMM, formatToYYYYMMDD, getSixDaysAgo } from '@/shared/utils/date'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import AnalysisTab from '../components/analysis-tab'
import WeekPeriodPicker from '../components/week-period-picker'
import MonthPeriodPicker from '../components/month-period-picker'
import WeekGraphContainer from '../components/week-graph-container'
import MonthGraphContainer from '../components/month-graph-container'
import CollectionCategoryContainer from '../components/collection-category-container'
import { useMemo } from 'react'

const AnalysisView = () => {
  const today = new Date()
  const searchParams = useSearchParams()
  const { selectedDirectoryId } = useDirectoryContext()

  const tab = searchParams.get('tab') ?? 'week'
  const startDate = searchParams.get('startDate') ?? formatToYYYYMMDD(getSixDaysAgo())
  const endDate = searchParams.get('endDate') ?? formatToYYYYMMDD(today)
  const selectedMonth = searchParams.get('month') ?? formatToYYYYMM(today)

  const { data: weeklyAnalysisData, isPending: weeklyIsPending } = useQuery(
    queries.quiz.weeklyAnalysis(
      startDate,
      endDate,
      selectedDirectoryId !== null ? selectedDirectoryId : undefined
    )
  )
  const { data: monthlyAnalysisData, isPending: monthlyIsPending } = useQuery(
    queries.quiz.monthlyAnalysis(
      selectedMonth + '-01',
      selectedDirectoryId !== null ? selectedDirectoryId : undefined
    )
  )

  const collectionsAnalysis = useMemo(
    () =>
      tab === 'week'
        ? weeklyAnalysisData?.collectionsAnalysis
        : monthlyAnalysisData?.collectionsAnalysis,
    [tab, weeklyAnalysisData, monthlyAnalysisData]
  )

  if (weeklyIsPending || monthlyIsPending) {
    return <Loading center />
  }

  return (
    <main className="h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden">
      <AnalysisTab />
      {tab === 'week' && <WeekPeriodPicker today={today} />}
      {tab === 'month' && <MonthPeriodPicker today={today} />}

      {tab === 'week' && <WeekGraphContainer data={weeklyAnalysisData} today={today} />}
      {tab === 'month' && <MonthGraphContainer data={monthlyAnalysisData} today={today} />}

      <div className="h-[12px] w-full bg-background-base-02" />

      <CollectionCategoryContainer data={collectionsAnalysis} />
    </main>
  )
}

export default AnalysisView
