'use client'

import { useRouter } from 'next/navigation'
import Icon from './icon'
import { cn } from '../lib/utils'
import React from 'react'

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
