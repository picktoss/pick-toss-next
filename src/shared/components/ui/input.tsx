import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import Text from '../text'
import Icon from '../v3/icon'

const inputVariants = cva(
  'flex h-[48px] w-full border bg-background-base-01 p-[12px] !text-subtitle2-medium text-text-primary ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtitle2-medium placeholder:text-text-placeholder-01 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled',
  {
    variants: {
      variant: {
        none: '',
        default:
          'rounded-[8px] border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
        info: 'rounded-[8px] border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
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
  label?: string
  right?: React.ReactNode
  message?: string
  hasError?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, label, right, message, hasError = false, ...props }, ref) => {
    return (
      <div className={className}>
        {label && (
          <Text
            as="label"
            typography="text1-medium"
            className={cn('mb-[8px] text-text-sub', hasError && 'text-text-critical')}
          >
            {label}
          </Text>
        )}
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              inputVariants({ variant }),
              hasError && 'ring-1 ring-border-error placeholder:text-text-primary',
              right && 'pr-[58px]'
            )}
            ref={ref}
            {...props}
          />
          {right && <div className="absolute right-3 top-3 flex items-center">{right}</div>}
        </div>
        {message && (
          <Text
            typography="text2-medium"
            className={cn('mt-[8px] flex items-center gap-[5px] text-text-caption', {
              'text-text-info': variant === 'info',
              'text-text-critical': hasError,
            })}
          >
            {hasError && (
              <Icon name="close-circle" className="size-[16px]" fill="#F4502C" stroke="#EBEFF3" />
            )}
            {message}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
