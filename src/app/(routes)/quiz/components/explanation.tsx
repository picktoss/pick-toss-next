'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HTMLAttributes, useEffect, useRef } from 'react'
import { SCROLL_TO_EXPLANATION_DURATION } from '../constants'
import Loading from '@/components/loading'

interface ExplanationProps extends HTMLAttributes<HTMLDivElement> {
  isCorrect: boolean
  correctItem: string
  explanation: string
  next: () => void
  isLoadingResult: boolean
}

export default function Explanation({
  isCorrect,
  correctItem,
  explanation,
  next,
  isLoadingResult,
  className,
}: ExplanationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const timer = setTimeout(() => {
      containerRef.current!.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, SCROLL_TO_EXPLANATION_DURATION)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={className} ref={containerRef}>
      <div
        className={cn(
          'px-[20px] pb-[148px] pt-[25px] flex flex-col lg:flex-row lg:pt-[20px] lg:pb-[16px] lg:min-h-[180px] lg:items-center lg:pl-[72px] lg:relative',
          isCorrect ? 'bg-notice-green/20' : 'bg-gray-02'
        )}
      >
        <div className="mb-[24px] flex items-center gap-[16px] lg:shrink-0 lg:flex-col lg:gap-[12px]">
          <div>
            {isCorrect ? (
              <CorrectIcon className="lg:size-[56px]" />
            ) : (
              <IncorrectIcon className="lg:size-[56px]" />
            )}
          </div>
          <div className={cn('!text-h3-bold', isCorrect ? 'text-notice-green' : 'text-notice-red')}>
            {isCorrect ? '정답이에요!' : '오답이에요'}
          </div>
        </div>
        <div className="mb-[48px] flex flex-col text-gray-08 lg:gap-[8px] lg:pl-[40px] lg:pr-[178px]">
          <div className="text-body1-bold">정답: {correctItem}</div>
          <div className="text-text-regular">{explanation}</div>
        </div>
        <div className="flex justify-end lg:absolute lg:bottom-[30px] lg:right-[28px]">
          <Button className="flex w-[116px] gap-[8px]" onClick={next} disabled={isLoadingResult}>
            {isLoadingResult ? (
              <Loading size="xs" />
            ) : (
              <>
                <div>다음</div>
                <ArrowRightIcon />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

function CorrectIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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

function IncorrectIcon({ className }: { className: HTMLElement['className'] }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="24" fill="#F66444" />
      <path d="M16 16L32 32" stroke="#F6FAFD" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 16L16 32" stroke="#F6FAFD" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 7.72998H20.25" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M12.8862 1.25L20.2499 8L12.8862 14.75"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
