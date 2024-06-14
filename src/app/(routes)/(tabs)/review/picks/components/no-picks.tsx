import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

export function NoPicks() {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="center flex w-full flex-col items-center">
        <GrayPinIcon className="size-[56px] lg:size-[88px]" />
        <p className="mt-[15px] text-body1-bold-eng text-gray-08 lg:mt-[20px] lg:text-h3-bold">
          저장한 pick이 없어요
        </p>
        <p className="mt-[8px] text-body2-regular text-gray-07 lg:text-body2-medium">
          노트 창고에서 pick을 저장해보세요
        </p>
        <Link href="/repository">
          <Button className="mt-[24px] h-[40px] w-[120px] !text-body2-bold">노트 창고 가기</Button>
        </Link>
      </div>
    </div>
  )
}

function GrayPinIcon({ className }: { className: HTMLAttributes<HTMLDivElement>['className'] }) {
  return (
    <svg
      width="88"
      height="88"
      className={className}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.8291 52L38.5992 47.8258L21.2066 77.9506C20.0539 79.9471 20.738 82.5 22.7345 83.6527C24.731 84.8053 27.2839 84.1213 28.4365 82.1248L45.8291 52Z"
        fill="#D2D6DB"
      />
      <rect
        width="8.34842"
        height="25.0453"
        transform="matrix(-0.866025 -0.5 -0.5 0.866025 52.7842 39.9443)"
        fill="#A2A6AB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78.3962 20.2926C79.1439 20.7243 79.4 21.6804 78.9684 22.4281L76.768 26.2393C75.0654 29.1881 71.3237 30.2257 68.3524 28.5991L56.1309 49.7673C59.0212 51.5286 59.9913 55.2851 58.2898 58.2322L56.0894 62.0434C55.6577 62.7911 54.7016 63.0473 53.9539 62.6156L24.9204 45.853C24.1726 45.4214 23.9165 44.4653 24.3482 43.7176L26.5485 39.9064C28.2522 36.9555 31.9979 35.9185 34.9702 37.5498L47.1915 16.3819C44.2967 14.6221 43.3241 10.8625 45.0267 7.91344L47.2271 4.10225C47.6588 3.35455 48.6149 3.09836 49.3626 3.53005L78.3962 20.2926Z"
        fill="#A2A6AB"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3917_2788"
          x1="63.8767"
          y1="11.9098"
          x2="39.4398"
          y2="54.2358"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7F7F7F" />
          <stop offset="1" stopColor="#C5C5C5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
