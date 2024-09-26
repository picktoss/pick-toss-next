import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'flex h-[48px] w-full border bg-background-base-01 p-[12px] !text-subtitle2-medium text-text-primary ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtitle2-medium placeholder:text-text-placeholder-01 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        none: '',
        default:
          'rounded-[8px] border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
        info: '',
        disabled: '',
        search:
          'rounded-[56px] border-none bg-background-base-03 px-[16px] py-[12px] placeholder:text-text-placeholder-01',
      },
    },
    defaultVariants: {
      variant: 'none',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  right?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, right, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant }), className)}
          ref={ref}
          {...props}
        />
        {right && <div className="absolute right-3 top-3 flex items-center">{right}</div>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
