'use client'

import DirectorySelectDrawer from '@/features/directory/components/directory-select-drawer'
import { useDirectoryContext } from '@/features/directory/contexts/directory-context'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'
import { useCallback, useMemo, useState } from 'react'
import WeekGraphItem from '../week-graph-item'
import { formatToMD, formatToYYYYMMDD } from '@/shared/utils/date'
import { weekAnalysisMockData } from '../../config'

interface Props {
  data: typeof weekAnalysisMockData
  today: Date
}

const WeekGraphContainer = ({ data, today }: Props) => {
  const todayDateString = formatToYYYYMMDD(today)
  const maxTotalCount = useMemo(
    () => Math.max(...data.quizzes.map((data) => data.totalQuizCount)),
    [data.quizzes]
  )

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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

      <Text typography="title3" className="my-[8px]">
        하루에{' '}
        <Text as={'span'} color="info">
          {data.averageQuizCountPerDay}문제
        </Text>{' '}
        정도 풀어요
      </Text>

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
        {data.quizzes.map((data, index) => {
          const notSolved = data.totalQuizCount === 0
          const scaleFactor = data.totalQuizCount / maxTotalCount

          const barHeight = notSolved ? 10 : scaleFactor * 100
          const rightHeight = notSolved ? 0 : (data.correctAnswerCount / data.totalQuizCount) * 100

          return (
            <WeekGraphItem
              key={index}
              index={index}
              activeIndex={activeIndex}
              handleBarClick={handleBarClick}
              handleBarMouseEnter={handleBarMouseEnter}
              handleBarMouseLeave={handleBarMouseLeave}
              date={data.date === todayDateString ? '오늘' : formatToMD(data.date)}
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
          <Text as={'span'} typography="subtitle2-bold">
            {data.totalQuizCountDuringThePeriod} 문제
          </Text>
        </div>
        <div className="flex-center w-1/2 flex-col">
          <Text as={'span'} typography="text2-medium" color="sub">
            평균 정답률
          </Text>
          <Text as={'span'} typography="subtitle2-bold">
            {data.averageCorrectRate}%
          </Text>
        </div>
      </div>
    </div>
  )
}

export default WeekGraphContainer
