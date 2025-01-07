'use client'

import DirectorySelectDrawer from '@/features/directory/components/directory-select-drawer'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useCallback, useMemo, useState } from 'react'
import WeekGraphItem from '../week-graph-item'
import { formatToMD, formatToYYYYMMDD } from '@/shared/utils/date'
import { weekAnalysisMockData } from '../../config'
import { Button } from '@/shared/components/ui/button'

interface Props {
  data: typeof weekAnalysisMockData
  today: Date
}

const WeekGraphContainer = ({ data, today }: Props) => {
  const todayDateString = formatToYYYYMMDD(today)
  const maxTotalCount = useMemo(() => {
    try {
      if (!data?.quizzes?.length) return 1 // 0으로 나누기 방지를 위해 1로 설정
      return Math.max(...data.quizzes.map((data) => data.totalQuizCount))
    } catch (error) {
      console.error('Error calculating maxTotalCount:', error)
      return 1
    }
  }, [data.quizzes])
  const isEmpty = !data.totalQuizCountDuringThePeriod

  const defaultIndex = 6 // 오늘 데이터
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultIndex)
  const { selectedDirectory } = useDirectoryContext()

  const directoryName = !selectedDirectory?.name
    ? '전체 노트'
    : selectedDirectory.tag === 'DEFAULT'
    ? '전체 노트'
    : selectedDirectory.name

  const handleBarClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleBarMouseEnter = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const handleBarMouseLeave = useCallback(() => {
    setActiveIndex(null)
  }, [])

  return (
    <div className="flex h-fit w-full flex-col px-[16px] pb-[48px]">
      <DirectorySelectDrawer
        trigger={
          <button className="flex w-fit items-center">
            <Text as={'span'} typography="subtitle2-medium" color="sub">{`${
              selectedDirectory?.emoji ?? ''
            } ${directoryName}`}</Text>
            <Icon name="chevron-down" className="ml-[8px] size-[16px] text-icon-tertiary" />
          </button>
        }
      />

      {isEmpty ? (
        <Text typography="title3" className="my-[8px]">
          최근 푼 문제가 없어요
        </Text>
      ) : (
        <Text typography="title3" className="my-[8px]">
          하루에{' '}
          <Text as={'span'} color="info">
            {data.averageQuizCountPerDay}문제
          </Text>{' '}
          정도 풀어요
        </Text>
      )}

      <div className="flex justify-end gap-[12px]">
        <div className="flex items-center">
          <div className="mr-[4px] size-[12px] rounded-[4px] bg-border-divider"></div>
          <Text as={'span'} typography="caption-medium" color="sub">
            문제 수
          </Text>
        </div>
        <div className="flex items-center">
          <div className="mr-[4px] size-[12px] rounded-[4px] bg-text-info"></div>
          <Text as={'span'} typography="caption-medium" color="sub">
            정답 수
          </Text>
        </div>
      </div>

      <div className="relative mt-[60px] flex h-[155px] w-full gap-[14px]">
        {Array.isArray(data.quizzes) &&
          data.quizzes.map((data, index) => {
            const notSolved = data.totalQuizCount === 0
            const scaleFactor = data.totalQuizCount / maxTotalCount

            const barHeight = notSolved ? 10 : scaleFactor * 100
            const rightHeight = notSolved
              ? 0
              : (data.correctAnswerCount / data.totalQuizCount) * 100

            const renderDateText = data.date === todayDateString ? '오늘' : formatToMD(data.date)

            return (
              <WeekGraphItem
                key={index}
                index={index}
                activeIndex={activeIndex}
                handleBarClick={handleBarClick}
                handleBarMouseEnter={handleBarMouseEnter}
                handleBarMouseLeave={handleBarMouseLeave}
                date={renderDateText}
                totalCount={data.totalQuizCount}
                rightCount={data.correctAnswerCount}
                barHeight={barHeight}
                rightHeight={rightHeight}
              />
            )
          })}
      </div>

      <div className="mt-[20px] flex h-fit w-full rounded-[12px] bg-background-base-02 py-[18px]">
        <div className="flex-center w-1/2 flex-col border-r border-border-divider">
          <Text as={'span'} typography="text2-medium" color="sub">
            7일간 푼 문제
          </Text>
          <Text as={'span'} typography="subtitle2-bold" color={isEmpty ? 'sub' : 'primary'}>
            {data.totalQuizCountDuringThePeriod} 문제
          </Text>
        </div>
        <div className="flex-center w-1/2 flex-col">
          <Text as={'span'} typography="text2-medium" color="sub">
            평균 정답률
          </Text>
          <Text as={'span'} typography="subtitle2-bold" color={isEmpty ? 'sub' : 'primary'}>
            {data.averageCorrectRate}%
          </Text>
        </div>
      </div>

      {isEmpty && (
        <Button variant={'mediumRound'} className="mt-[20px] w-full">
          퀴즈노트에서 복습 시작하기
        </Button>
      )}
    </div>
  )
}

export default WeekGraphContainer
