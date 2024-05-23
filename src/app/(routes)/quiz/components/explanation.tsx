'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ExplanationProps {
  isCorrect: boolean
  correctItem: string
  explanation: string
  next: () => void
  isLast: boolean
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function Explanation({
  isCorrect,
  correctItem,
  explanation,
  next,
  isLast,
  className,
}: ExplanationProps) {
  return (
    <div className={className}>
      <div
        className={cn(
          'px-[20px] pb-[148px] pt-[25px] flex flex-col',
          isCorrect ? 'bg-notice-green/40' : 'bg-gray-02'
        )}
      >
        <div className="mb-[24px] flex items-center gap-[16px]">
          <div>{isCorrect ? <CorrectIcon /> : <IncorrectIcon />}</div>
          <div className={cn('!text-h3-bold', isCorrect ? 'text-notice-green' : 'text-notice-red')}>
            {isCorrect ? '정답이에요!' : '오답이에요'}
          </div>
        </div>
        <div className="mb-[48px] flex flex-col text-gray-08">
          <div className="text-body1-bold">정답: {correctItem}</div>
          <div className="">{explanation}</div>
        </div>
        <div className="flex justify-end">
          <Button className="w-fit" onClick={next}>
            {isLast ? '결과보기' : '다음'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CorrectIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#63CF75" />
      <path
        d="M14.666 22.9521L21.9707 30.6667L33.3334 18.6663"
        stroke="white"
        strokeWidth="3.99992"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IncorrectIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#F66444" />
      <path d="M16 16L32 32" stroke="#F6FAFD" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 16L16 32" stroke="#F6FAFD" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
