// TODO: 파일 위치에 대한 고민 필요
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface IconProps {
  isActive: boolean
}

interface NavItem {
  href: string
  Icon: (props: IconProps) => ReactNode
  title: string
  segments: string[][]
}

export const navigationItems: NavItem[] = [
  {
    href: '/main',
    title: '파워업 퀴즈',
    Icon: PowerUpIcon,
    segments: [['main']],
  },
  {
    href: '/repository',
    title: '노트 창고',
    Icon: StudyRepositoryIcon,
    segments: [['repository'], ['document']],
  },
  {
    href: '/review',
    title: '복습 체크',
    Icon: ReviewCheckIcon,
    segments: [['review']],
  },
  {
    href: '/profile',
    title: '마이',
    Icon: ProfileIcon,
    segments: [['/profile']],
  },
]

interface SegmentsRecord {
  segments: string[]
  item: NavItem
}

const descendingOrderOfSegments = (recordA: SegmentsRecord, recordB: SegmentsRecord): number =>
  recordB.segments.length - recordA.segments.length

const getIsActiveNav = (currentSegments: string[]) => (record: SegmentsRecord) =>
  record.segments.every((seg, index) => currentSegments[index] === seg)

export const findActiveNav = (items: NavItem[], currentSegments: string[]): NavItem | undefined => {
  const segments = items.reduce<SegmentsRecord[]>((result, item) => {
    item.segments.forEach((segments) => {
      result.push({
        segments,
        item,
      })
    })
    return result
  }, [])

  const isActiveSegment = getIsActiveNav(currentSegments)
  return segments.sort(descendingOrderOfSegments).find(isActiveSegment)?.item
}

// TODO: Icon 컴포넌트 구현
function PowerUpIcon({ isActive }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#D2D6DB'}
    >
      <g clipPath="url(#clip0_2028_62)">
        <path
          d="M12.4548 5.5L10.1748 10.3598H14.4998L11.4998 15.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.785 22.915C7 21 7.915 18.985 7.915 18.985C9.17 19.46 10.55 19.72 12 19.72C17.8 19.72 22.5 15.53 22.5 10.36C22.5 5.19 17.8 1 12 1C6.2 1 1.5 5.19 1.5 10.36C1.5 15.155 5.075 17.215 5.075 17.215"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_62">
          <rect width="23" height="23.86" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ReviewCheckIcon({ isActive }: IconProps) {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#D2D6DB'}
    >
      <g clipPath="url(#clip0_2028_9)">
        <path
          d="M12 13.0002L15.81 16.8102L21.71 10.9102"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 20.5H1V13.275H7V7.5H13V1.5H20V8.86"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_9">
          <rect width="23.94" height="21" fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function StudyRepositoryIcon({ isActive }: IconProps) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={isActive ? '#FFAB40' : '#D2D6DB'}
    >
      <g clipPath="url(#clip0_2028_36)">
        <path
          d="M1.5 14.97V3.595C1.5 2.435 2.44 1.5 3.595 1.5H16.4C17.56 1.5 18.495 2.44 18.495 3.595V20.37C18.495 21.53 17.555 22.465 16.4 22.465H3.595C2.435 22.465 1.5 21.525 1.5 20.37V18.275H14.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M5.52002 6.40527H14.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2028_36">
          <rect width="19" height="22.97" fill="white" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function ProfileIcon({ isActive }: IconProps) {
  return <div className={cn('size-[24px] rounded-full bg-gray-07', isActive ?? 'bg-orange-500')} />
}
