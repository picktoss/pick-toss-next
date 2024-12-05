'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'
import Icon from '../../custom/icon'

const labelVariants = cva(
  'flex items-center text-text1-medium leading-none text-text-sub peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  essential?: boolean
  hasError?: boolean
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, essential = false, hasError = false, ...props }, ref) => {
    const essentialIcon = essential ? <Icon name="asterisk" /> : null

    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants(), className, hasError && 'text-text-critical')}
        {...props}
      >
        <span>{props.children}</span>
        {essentialIcon}
      </LabelPrimitive.Root>
    )
  }
)
Label.displayName = LabelPrimitive.Root.displayName

export default Label
