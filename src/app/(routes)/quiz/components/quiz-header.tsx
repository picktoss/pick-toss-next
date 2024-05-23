'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { HTMLAttributes } from 'react'

interface QuizHeaderProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export default function QuizHeader({ className }: QuizHeaderProps) {
  const router = useRouter()

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="flex flex-col" onClick={() => router.back()}>
          <ExitIcon />
        </Button>
        <div className="flex items-end gap-[8px]">
          <TimerIcon />
          <span className="text-body2-medium text-gray-07">00:04:12</span>
        </div>
      </div>
    </div>
  )
}

function ExitIcon() {
  return (
    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.1686 13.6006V18.7895C16.1686 19.3627 15.704 19.8273 15.1308 19.8273H2.33081C1.75763 19.8273 1.29297 19.3627 1.29297 18.7895V2.53002C1.29297 1.95684 1.75762 1.49219 2.33081 1.49219H15.1308C15.704 1.49219 16.1686 1.95684 16.1686 2.53003V7.37361"
        stroke="#A2A6AB"
        strokeWidth="1.38378"
        strokeLinecap="round"
      />
      <path
        d="M0.600586 2.31843C0.600586 1.58819 1.33474 1.08631 2.01517 1.35139L11.0098 4.85553C11.4084 5.01083 11.6709 5.39479 11.6709 5.82258V22.8065C11.6709 23.5367 10.9367 24.0386 10.2563 23.7735L1.26168 20.2694C0.863071 20.1141 0.600586 19.7301 0.600586 19.3023V2.31843Z"
        fill="#A2A6AB"
      />
      <path
        d="M13.7471 10.4868L21.0119 10.4868"
        stroke="#A2A6AB"
        strokeWidth="1.38378"
        strokeLinecap="round"
      />
      <path
        d="M18.9365 7.37354L21.5608 9.99781C21.831 10.268 21.831 10.7061 21.5608 10.9763L18.9365 13.6006"
        stroke="#A2A6AB"
        strokeWidth="1.38378"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8.00049" y="2" width="2" height="2.25" rx="0.5" fill="#FFAB40" />
      <circle cx="9" cy="12.75" r="9" fill="#FFECD0" />
      <circle cx="9" cy="12.75" r="8.375" stroke="#FF9100" strokeWidth="1.25" />
      <path
        d="M16.1117 4.13219C15.8286 3.84911 15.3696 3.84911 15.0866 4.13219L13.6246 5.59419L15.1753 7.14497L16.6373 5.68297C16.9204 5.39989 16.9204 4.94093 16.6373 4.65785L16.1117 4.13219Z"
        fill="#FF9100"
      />
      <path
        d="M1.7892 4.13219C2.07228 3.84911 2.53124 3.84911 2.81432 4.13219L4.27632 5.59419L2.72554 7.14497L1.26353 5.68297C0.980457 5.39989 0.980456 4.94093 1.26353 4.65785L1.7892 4.13219Z"
        fill="#FF9100"
      />
      <g filter="url(#filter0_f_2672_5384)">
        <path
          d="M9 6.75C8.01329 6.75 7.04182 6.99334 6.17162 7.45847C5.30142 7.9236 4.55937 8.59616 4.01118 9.41658C3.463 10.237 3.12561 11.1799 3.02889 12.1619C2.93218 13.1439 3.07913 14.1345 3.45672 15.0461C3.83432 15.9577 4.43091 16.7621 5.19364 17.3881C5.95637 18.014 6.86171 18.4422 7.82946 18.6347C8.7972 18.8272 9.79749 18.7781 10.7417 18.4916C11.6859 18.2052 12.5449 17.6903 13.2426 16.9926L9 12.75V6.75Z"
          fill="#FFD180"
        />
      </g>
      <rect x="6.50049" y="0.249756" width="5" height="2.5" rx="0.5" fill="#FF9100" />
      <defs>
        <filter
          id="filter0_f_2672_5384"
          x="1.8"
          y="5.55"
          width="12.6427"
          height="14.4"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.6" result="effect1_foregroundBlur_2672_5384" />
        </filter>
      </defs>
    </svg>
  )
}
