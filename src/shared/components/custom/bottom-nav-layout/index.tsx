'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useMemo } from 'react'
import { navigationItems } from './config'

interface Props {
  where: (typeof navigationItems)[number]['title']
  children: React.ReactNode
}

const BottomNavLayout = ({ where = '홈', children }: Props) => {
  const activeItem = useMemo(() => navigationItems.find((item) => item.title === where), [])

  return (
    <div className={cn(activeItem && 'pb-[88px]')}>
      {children}
      <div className="fixed bottom-0 h-[88px] w-full max-w-mobile border border-border-default bg-background-base-01 pb-[24px] pt-[10px]">
        <div className="flex px-[20px]">
          {navigationItems.map((item) => {
            const { title, href, Icon } = item
            const isActive = activeItem === item

            return (
              <Link key={title} href={href} className="flex flex-1 flex-col items-center gap-[4px]">
                <Icon isActive={isActive} />
                <span
                  className={cn(
                    '!text-text2-medium text-button-text-disabled',
                    isActive && '!text-text2-bold text-button-text-primary'
                  )}
                >
                  {title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BottomNavLayout
