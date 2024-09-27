import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import Text from '../text'
import Icon from '../v3/icon'
import { Label } from './label'

const inputVariants = cva(
  'flex h-[48px] w-full border bg-background-base-01 p-[12px] !text-subtitle2-medium text-text-primary ring-offset-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-subtitle2-medium placeholder:text-text-placeholder-01 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-background-disabled disabled:opacity-50 disabled:placeholder:text-text-disabled',
  {
    variants: {
      variant: {
        default:
          'rounded-[8px] border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
        info: 'rounded-[8px] border-none bg-background-base-02 focus:bg-background-base-01 focus:ring-1 focus:ring-border-focused',
        search:
          'rounded-[56px] border-none bg-background-base-03 px-[16px] py-[12px] placeholder:text-text-placeholder-01',
        'note-title':
          'h-fit border-none px-[16px] pb-[19px] pt-[24px] !text-title2 placeholder:text-text-placeholder-02',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  essential?: boolean
  right?: React.ReactNode
  message?: string
  hasError?: boolean
  LabelComponent?: React.ElementType
  TextComponent?: React.ElementType
  IconComponent?: React.ElementType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type = 'text',
      label,
      essential,
      right,
      message,
      hasError = false,
      LabelComponent = Label,
      TextComponent = Text,
      IconComponent = Icon,
      ...props
    },
    ref
  ) => {
    const errorIcon =
      hasError && IconComponent ? (
        <IconComponent
          name="close-circle"
          className="size-[16px]"
          fill="#F4502C"
          stroke="#EBEFF3"
        />
      ) : null

    return (
      <div className={className}>
        {label && LabelComponent && (
          <LabelComponent essential={essential} hasError={hasError}>
            {label}
          </LabelComponent>
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
            aria-invalid={hasError}
            {...props}
          />
          {right && (
            <div className="absolute bottom-1/2 right-[12px] flex translate-y-1/2 items-center">
              {right}
            </div>
          )}
        </div>
        {message && TextComponent && (
          <TextComponent
            typography="text2-medium"
            className={cn('mt-[8px] flex items-center gap-[5px] text-text-caption', {
              'text-text-info': variant === 'info',
              'text-text-critical': hasError,
            })}
          >
            {errorIcon}
            {message}
          </TextComponent>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
