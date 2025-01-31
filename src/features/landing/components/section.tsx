import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: ReactNode
}

export function Section({ className, title, description, children }: Props) {
  return (
    <div className={className}>
      <section>
        <div className="px-[20px]">
          <div className="text-body1-bold text-orange-06">{title}</div>
          <div className="mt-[8px] text-h3-bold text-gray-09">{description}</div>
        </div>
        {children}
      </section>
    </div>
  )
}
