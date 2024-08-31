import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  center?: boolean
}

export function Title({ center, className, children }: Props) {
  return (
    <div className={className}>
      <h2
        className={cn(
          '!text-h3-bold text-gray-09 lg:!text-h2-medium',
          center && '!text-body1-bold center'
        )}
      >
        {children}
      </h2>
    </div>
  )
}
