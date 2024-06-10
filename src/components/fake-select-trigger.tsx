import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export const FakeSelectTrigger = forwardRef<
  HTMLButtonElement,
  { value: string; emoji?: string; className?: HTMLButtonElement['className'] }
>(({ emoji, value, className }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'flex h-[40px] w-full items-center outline-none justify-between rounded-md bg-gray-01 pl-[14px] pr-[7px] !text-body1-bold text-gray-08',
        className
      )}
    >
      <div className="flex items-center gap-[8px]">
        {emoji && <div>{emoji}</div>}
        <div>{value}</div>
      </div>
      <div className="flex size-[16px] items-center justify-center">
        <ChevronDown />
      </div>
    </button>
  )
})
FakeSelectTrigger.displayName = 'FakeSelectTrigger'

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L5 5L9 1"
        stroke="#A2A6AB"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
