'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/lib/utils'
import Icon from '../custom/icon'
import { isSameMonth } from 'date-fns'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  today: Date
  selectedMonth: Date
}

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  selectedMonth,
  onMonthChange,
  today,
  ...props
}: CalendarProps) {
  const isCurrentMonth = (month: Date) => isSameMonth(month, today)

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
