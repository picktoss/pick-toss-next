import Text from '@/shared/components/ui/text'
import { cn } from '@/shared/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
  date: string
  isFirst: boolean
}

const DateContainer = ({ children, date, isFirst }: PropsWithChildren & Props) => {
  return (
    <div className={cn('flex flex-col', isFirst && 'mt-[22px]')}>
      <Text typography="text1-medium" className="text-text-sub">
        {date}
      </Text>

      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export default DateContainer
