'use client'

import { useRouter } from 'next/navigation'
import Icon from './icon'
import { cn } from '../lib/utils'

const GoBackButton = ({ className }: { className?: HTMLElement['className'] }) => {
  const router = useRouter()

  return (
    <button className={cn('justify-self-start', className)} onClick={() => router.back()}>
      <Icon name="arrow-left" className="size-[24px]" />
    </button>
  )
}

export default GoBackButton
