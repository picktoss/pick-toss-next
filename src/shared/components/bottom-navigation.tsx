'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useMemo } from 'react'

export const navigationItems = [
  {
    href: '/main',
    title: '홈',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <div className="flex-center size-[24px]">
          <div
            className={cn(
              'size-[18px] rounded-full',
              isActive ? 'bg-icon-primary' : 'bg-icon-disabled'
            )}
          />
        </div>
      )
    },
    segments: ['main'],
  },
  {
    href: '/note',
    title: '퀴즈 노트',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <div className="flex-center size-[24px]">
          <div
            className={cn(
              'size-[18px] rounded-full',
              isActive ? 'bg-icon-primary' : 'bg-icon-disabled'
            )}
          />
        </div>
      )
    },
    segments: ['note'],
  },
  {
    href: '/collection',
    title: '컬렉션',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <div className="flex-center size-[24px]">
          <div
            className={cn(
              'size-[18px] rounded-full',
              isActive ? 'bg-icon-primary' : 'bg-icon-disabled'
            )}
          />
        </div>
      )
    },
    segments: ['collection'],
  },
  {
    href: '/profile',
    title: '마이',
    icon: ({ isActive }: { isActive: boolean }) => {
      return (
        <div className="flex-center size-[24px]">
          <div
            className={cn(
              'size-[18px] rounded-full',
              isActive ? 'bg-icon-primary' : 'bg-icon-disabled'
            )}
          />
        </div>
      )
    },
    segments: ['profile'],
  },
]

const BottomNavigation = () => {
  const segments = useSelectedLayoutSegments()

  const activeItem = useMemo(() => findActiveNavItem(segments), [segments])

  return (
    <div className="h-[54px] w-full">
      <div className="flex justify-between px-[50px]">
        {navigationItems.map((item) => {
          const { title, href, icon: Icon } = item
          const isActive = activeItem === item

          return (
            <Link key={title} href={href} className="flex flex-col items-center gap-[4px]">
              <Icon isActive={isActive} />
              <span className={cn('text-gray-06', isActive && 'text-orange-06')}>{title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation

const findActiveNavItem = (currentSegments: string[]) => {
  const activeItem = navigationItems.find((item) => {
    return item.segments.some((segment) => currentSegments.includes(segment))
  })

  return activeItem
}
