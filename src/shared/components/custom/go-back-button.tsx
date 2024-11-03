'use client'

import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import Icon from './icon'

const GoBackButton = ({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const router = useRouter()

  return (
    <button
      className={cn('justify-self-start', className)}
      onClick={onClick ? onClick : () => router.back()}
      {...props}
    >
      <Icon name="arrow-left" className="size-[24px]" />
    </button>
  )
}

export default GoBackButton
