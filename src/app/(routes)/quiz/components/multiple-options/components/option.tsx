'use client'

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

export const optionVariants = cva(
  'flex items-center gap-[16px] rounded-[12px] border py-[12px] pl-[11px] pr-[8px] text-start !text-text-medium',
  {
    variants: {
      variant: {
        idle: 'border-gray-02 bg-white text-gray-08',
        choose: 'border-orange-05 bg-orange-01 !text-text-bold text-orange-06',
        disabled: 'border-gray-02 bg-gray-02 text-gray-06',
        correct: 'border-notice-green bg-white !text-text-bold text-notice-green',
        incorrect: 'border-gray-02 bg-gray-02 text-gray-07',
      },
    },
    defaultVariants: {
      variant: 'idle',
    },
  }
)

interface MultipleOptionProps extends VariantProps<typeof optionVariants> {
  onClick: () => void
  option: string
  order: string
  disabled?: boolean
}

export default function MultipleOption({
  onClick,
  option,
  order,
  variant,
  disabled,
}: MultipleOptionProps) {
  return (
    <button className={cn(optionVariants({ variant }))} onClick={onClick} disabled={disabled}>
      <div className="size-[36px] shrink-0">
        <OrderIcon variant={variant} order={order} />
      </div>
      <div>{option}</div>
    </button>
  )
}

function OrderIcon({ variant, order }: VariantProps<typeof optionVariants> & { order: string }) {
  switch (variant) {
    case 'correct':
      return <CorrectIcon />
    case 'incorrect':
      return <IncorrectIcon />
    default:
      return (
        <div
          className={cn(
            'flex size-full items-center justify-center rounded-full bg-gray-02 text-body1-bold-eng',
            variant === 'choose' && 'bg-orange-05 text-white',
            variant === 'disabled' && 'bg-gray-04 text-gray-07'
          )}
        >
          {order}
        </div>
      )
  }
}

function CorrectIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#63CF75" />
      <path
        d="M11 17.2143L16.4783 23L25 14"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IncorrectIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#F66444" />
      <path d="M12 11.9993L24 23.9993" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 11.9993L12 23.9993" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
