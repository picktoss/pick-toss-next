'use client'

import { findActiveNav, navigationItems } from '@/constants/navigation-items'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { useMemo } from 'react'

export default function BottomNavigation() {
  const segments = useSelectedLayoutSegments()

  const activeItem = useMemo(() => findActiveNav(navigationItems, segments), [segments])

  return (
    <div className="w-full">
      <div className="fixed bottom-0 flex h-[84px] w-full justify-around border-t border-gray-02 bg-white px-[20px] lg:hidden">
        {navigationItems.map((item) => {
          const { href, Icon, title } = item
          const isActive = activeItem == item
          return (
            <Link
              key={title}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 pt-[16px] text-tag"
            >
              <Icon isActive={isActive} />
              <span className={cn('text-gray-06', isActive && 'text-orange-06')}>{title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
