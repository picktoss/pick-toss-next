'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/lib/utils'
import Icon from '../custom/icon'
import { addDays, isSameDay, isSameMonth, parseISO, startOfDay } from 'date-fns'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  today: Date
  selectedMonth: Date
  solvedQuizDateRecords?: { date: string; isSolved: boolean }[]
}

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  selectedMonth,
  onMonthChange,
  today,
  solvedQuizDateRecords = [],
  ...props
}: CalendarProps) {
  const defaultDate = React.useMemo(() => new Date(), [])
  // const [month, setMonth] = React.useState<Date>(selectedMonth || today)
  const isCurrentMonth = (month: Date) => isSameMonth(month, today)

  const modifiers = React.useMemo(() => {
    const solvedDates = solvedQuizDateRecords
      .filter((record) => record.isSolved)
      .map((record) => startOfDay(parseISO(record.date)))

    const ranges: { start: Date; end: Date }[] = []
    let start: Date | null = null

    for (let i = 0; i < solvedDates.length; i++) {
      if (!start) start = solvedDates[i] ?? defaultDate // 시작점 저장

      // 다음 날짜가 현재 날짜 +1 이 아니라면, 범위 종료
      if (
        i === solvedDates.length - 1 ||
        addDays(solvedDates[i] ?? defaultDate, 1).getTime() !== solvedDates[i + 1]?.getTime()
      ) {
        ranges.push({ start: start, end: solvedDates[i] ?? defaultDate })
        start = null
      }
    }

    const singleSolvedDates = solvedDates.filter((date, index, arr) => {
      const prevDate = index > 0 ? arr[index - 1] : null
      const nextDate = index < arr.length - 1 ? arr[index + 1] : null

      const hasPrev = prevDate && isSameDay(addDays(prevDate, 1), date)
      const hasNext = nextDate && isSameDay(addDays(date, 1), nextDate)

      return !hasPrev && !hasNext
    })

    const filteredRanges = ranges.filter(
      ({ start, end }) =>
        !singleSolvedDates.some((date) => isSameDay(date, start) || isSameDay(date, end))
    )

    return {
      day_range_start: filteredRanges.map((r) => startOfDay(r.start)),
      day_range_end: filteredRanges.map((r) => startOfDay(r.end)),
      day_range_middle: solvedDates.filter(
        (date) =>
          !filteredRanges.some(
            ({ start, end }) =>
              isSameDay(startOfDay(date), startOfDay(start)) ||
              isSameDay(startOfDay(date), startOfDay(end))
          ) && !singleSolvedDates.includes(date)
      ),
      single_solved_day: singleSolvedDates,
    }
  }, [defaultDate, solvedQuizDateRecords])

  return (
    <DayPicker
      month={selectedMonth}
      onMonthChange={onMonthChange}
      showOutsideDays={showOutsideDays}
      disabled={{
        after: today,
      }}
      className={cn('p-3', className)}
      classNames={{
        root: 'flex-center',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'w-full flex-center pt-1 relative',
        caption_label: 'text-subtitle1-bold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          // buttonVariants({ variant: 'mediumIcon' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed'
        ),
        nav_button_previous: 'center !translate-x-[calc(50%-30px)] !translate-y-[calc(50%+2px)]',
        nav_button_next: cn(
          'center !translate-x-[calc(50%+45px)] !translate-y-[calc(50%+2px)]',
          selectedMonth &&
            isCurrentMonth(selectedMonth) &&
            'opacity-100 text-icon-disabled cursor-not-allowed pointer-events-none'
        ),
        table: 'flex-center flex-col border-collapse space-y-1',
        head_row: 'flex text-text-caption',
        head_cell: 'text-muted-foreground rounded-md w-11 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'cell h-9 w-11 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20'
        ),
        day: cn(
          // buttonVariants({ variant: 'mediumIcon' }),
          'h-9 w-9 p-0 font-normal aria-selected:bg-container-02 hover:bg-button-fill-primary hover:rounded-full hover:text-white hover:font-bold focus:bg-button-fill-primary focus:text-white focus:rounded-full'
        ),
        day_range_start:
          'day-range-start rounded-l-full bg-background-container-02 hover:bg-button-fill-primary',
        day_range_middle:
          'bg-background-container-02 aria-selected:bg-background-container-02 aria-selected:text-accent-foreground hover:bg-button-fill-primary',
        day_range_end:
          'day-range-end rounded-r-full bg-background-container-02 hover:bg-button-fill-primary',
        day_selected:
          'rounded-full !bg-button-fill-primary text-white hover:bg-button-fill-primary hover:text-white focus:bg-button-fill-primary focus:bg-button-fill-primary focus:text-white',
        day_today: 'text-text-accent',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'opacity-50 bg-transparent cursor-not-allowed pointer-events-none',
        day_hidden: 'invisible',
        ...classNames,
      }}
      modifiers={modifiers}
      modifiersClassNames={{
        day_range_start:
          'day-range-start rounded-l-full bg-background-container-02 hover:bg-button-fill-primary after:h-full after:w-[8px] after:bg-background-container-02 after:absolute after:top-0 after:right-[-4px]',
        day_range_end:
          'day-range-end rounded-r-full bg-background-container-02 hover:bg-button-fill-primary before:h-full before:w-[8px] before:bg-background-container-02 before:absolute before:top-0 before:left-[-4px]',
        day_range_middle:
          'day-range-middle bg-background-container-02 hover:bg-button-fill-primary before:h-full before:w-[8px] before:bg-background-container-02 before:absolute before:top-0 before:left-[-4px] after:h-full after:w-[8px] after:bg-background-container-02 after:absolute after:top-0 after:right-[-4px]',
        single_solved_day: 'rounded-full bg-background-container-02 hover:bg-button-fill-primary',
      }}
      components={{
        IconLeft: ({ ...props }) => <Icon name="triangle-left" {...props} />,
        IconRight: ({ ...props }) => (
          <Icon
            name="triangle-right"
            className={cn(
              selectedMonth &&
                isCurrentMonth(selectedMonth) &&
                'text-icon-disabled cursor-not-allowed pointer-events-none'
            )}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
