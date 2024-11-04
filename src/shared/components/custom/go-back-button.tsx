'use client'

import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import Icon from './icon'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: 'arrow-left' | 'cancel'
}

const GoBackButton = ({ className, onClick, icon = 'arrow-left', ...props }: Props) => {
  const router = useRouter()

  return (
    <button
      className={cn('justify-self-start', className)}
      onClick={onClick ? onClick : () => router.back()}
      {...props}
    >
      <Icon name={icon === 'arrow-left' ? 'arrow-left' : 'cancel'} className="size-[24px]" />
    </button>
  )
}

export default GoBackButton
