import { cn } from '@/shared/lib/utils'
import { HTMLAttributes } from 'react'
import Text from '../ui/text'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
}

const CategoryTag = ({ title, className, ...props }: Props) => {
  return (
    <div className={cn(className)} {...props}>
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
