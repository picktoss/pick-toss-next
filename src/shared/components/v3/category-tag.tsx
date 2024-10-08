import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import Text from '../text'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
}

const CategoryTag = ({ title, className }: Props) => {
  return (
    <div className={cn(className)}>
      <Text
        as="span"
        typography="text2-medium"
        className="rounded-[4px] bg-background-base-03 px-[8px] py-[2px]"
      >
        {title}
      </Text>
    </div>
  )
}

export default CategoryTag
