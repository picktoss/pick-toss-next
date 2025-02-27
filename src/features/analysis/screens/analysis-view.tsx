'use client'

import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
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
import Loading from '@/shared/components/custom/loading'

type Tab = 'week' | 'month'

const AnalysisView = () => {
  const today = new Date()
  const searchParams = useSearchParams()
  const paramsTab = searchParams.get('tab') ?? ''
  const { selectedDirectoryId, globalDirectoryId } = useDirectoryContext()

  const tab = (['week', 'month'].includes(paramsTab) ? paramsTab : 'week') as Tab
  const startDate = searchParams.get('startDate') ?? formatToYYYYMMDD(getSixDaysAgo())
  const endDate = searchParams.get('endDate') ?? formatToYYYYMMDD(today)
  const selectedMonth = searchParams.get('month') ?? formatToYYYYMM(today)

  const { data: weeklyAnalysisData, isPending: isWeeklyDataLoading } = useQuery(
    queries.quiz.weeklyAnalysis(
      startDate,
      endDate,
      selectedDirectoryId !== null
        ? selectedDirectoryId === globalDirectoryId
          ? undefined
          : selectedDirectoryId
        : undefined
    )
  )
  const { data: monthlyAnalysisData, isPending: isMonthlyDataLoading } = useQuery(
    queries.quiz.monthlyAnalysis(
      selectedMonth + '-01',
      selectedDirectoryId !== null
        ? selectedDirectoryId === globalDirectoryId
          ? undefined
          : selectedDirectoryId
        : undefined
    )
  )

  const collectionsAnalysis = useMemo(
    () =>
      tab === 'week'
        ? weeklyAnalysisData?.collectionsAnalysis
        : monthlyAnalysisData?.collectionsAnalysis,
    [tab, weeklyAnalysisData, monthlyAnalysisData]
  )

  const isLoading = useMemo(
    () => isWeeklyDataLoading || isMonthlyDataLoading,
    [isWeeklyDataLoading, isMonthlyDataLoading]
  )

  const thisWeek = tab === 'week' && endDate === formatToYYYYMMDD(today)
  const thisMonth = tab === 'month' && selectedMonth === formatToYYYYMM(today)
  const thisPeriod = thisWeek || thisMonth

  return (
    <main className="h-[calc(100dvh-54px)] w-full flex-col overflow-y-auto overflow-x-hidden">
      {isLoading && <Loading center />}

      <AnalysisTab />
      {tab === 'week' && <WeekPeriodPicker today={today} />}
      {tab === 'month' && <MonthPeriodPicker today={today} />}

      {tab === 'week' && (
        <WeekGraphContainer data={weeklyAnalysisData} today={today} isThisWeek={thisWeek} />
      )}
      {tab === 'month' && (
        <MonthGraphContainer data={monthlyAnalysisData} today={today} isThisMonth={thisMonth} />
      )}

      <CollectionCategoryContainer isThisPeriod={thisPeriod} data={collectionsAnalysis} />
    </main>
  )
}

export default AnalysisView
