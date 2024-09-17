import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'

interface SectionProps {
  title?: string
  content: React.ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export default function Section({ title, content, className }: SectionProps) {
  return (
    <section className={cn('text-body1-medium', className)}>
      {title ? <h5 className="pb-[13px] pl-[4px] text-small1-bold text-gray-06">{title}</h5> : null}
      {content}
    </section>
  )
}
