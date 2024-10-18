import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const tagVariants = cva(
  'inline-flex size-fit items-center justify-center whitespace-nowrap rounded-[4px] px-[6px] py-[2px] !text-caption-medium transition-colors',
  {
    variants: {
      colors: {
        special: 'bg-gradient-to-r from-orange-500 to-blue-400 text-button-label-primary',
        primary:
          'bg-button-fill-primary text-button-label-primary hover:bg-button-fill-primary-hover',
        'primary-loading': 'bg-button-fill-primary-loading text-button-label-primary',
        secondary: 'bg-button-fill-secondary text-button-label-secondary',
        tertiary: 'bg-button-fill-tertiary text-button-label-tertiary',
        outlined: 'border border-border-default bg-button-fill-outlined text-button-label-tertiary',
      },
    },
    defaultVariants: {
      colors: 'primary',
    },
  }
)

interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, colors, children, ...props }) => {
    return (
      <span className={cn(tagVariants({ colors }), className)} {...props}>
        {children}
      </span>
    )
  }
)
Tag.displayName = 'Tag'

export default Tag
