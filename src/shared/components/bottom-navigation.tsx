'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useMemo } from 'react'
import Icon from './v3/icon'

export const navigationItems = [
  {
    href: '/main',
    title: '홈',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="picktoss"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: ['main'],
  },
  {
    href: '/v3/note',
    title: '퀴즈 노트',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="quiz-note"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: ['note'],
  },
  {
    href: '/v3/collections',
    title: '컬렉션',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="planet"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: ['collections'],
  },
  {
    href: '/profile',
    title: '마이',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <Icon
          name="person"
          className="size-[24px]"
          fill={isActive ? 'var(--color-orange-500)' : 'var(--color-gray-200)'}
        />
      )
    },
    segments: ['profile'],
  },
]

const BottomNavigation = () => {
  const segments = useSelectedLayoutSegments()

  const activeItem = useMemo(() => findActiveNavItem(segments), [segments])

  return (
    <div className="fixed bottom-0 h-[88px] w-full max-w-[430px] border border-border-default bg-background-base-01 pb-[24px] pt-[18px]">
      <div className="flex px-[20px]">
        {navigationItems.map((item) => {
          const { title, href, icon: Icon } = item
          const isActive = activeItem === item

          return (
            <Link key={title} href={href} className="flex flex-1 flex-col items-center gap-[4px]">
              <Icon isActive={isActive} />
              <span
                className={cn(
                  'text-text2-bold text-button-text-disabled',
                  isActive && 'text-button-text-primary'
                )}
              >
                {title}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation

export const findActiveNavItem = (currentSegments: string[]) => {
  const activeItem = navigationItems.find((item) => {
    return item.segments.some((segment) => currentSegments.includes(segment))
  })

  return activeItem
}
