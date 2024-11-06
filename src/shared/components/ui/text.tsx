import { cn } from '@/shared/lib/utils'
import React, { ElementType, forwardRef } from 'react'

type Typography =
  | 'hero'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'subtitle1-bold'
  | 'subtitle2-bold'
  | 'subtitle2-medium'
  | 'text1-bold'
  | 'text1-medium'
  | 'text1-regular'
  | 'text2-bold'
  | 'text2-medium'
  | 'caption-bold'
  | 'caption-medium'
  | 'button1'
  | 'button2'
  | 'button3'
  | 'button4'
  | 'button5'
  | 'question'

type TextColor =
  | 'primary'
  | 'primary-inverse'
  | 'secondary'
  | 'secondary-inverse'
  | 'sub'
  | 'caption'
  | 'success'
  | 'critical'
  | 'info'
  | 'accent'
  | 'selected'
  | 'placeholder-01'
  | 'placeholder-02'
  | 'disabled'
  | 'right'
  | 'wrong'

export interface TextProps<T extends ElementType> extends React.HTMLAttributes<T> {
  typography?: Typography
  color?: TextColor
  as?: T
}

const typographyStyles: Record<Typography, string> = {
  hero: 'text-[36px] font-bold leading-[120%] tracking-[-0.02em]',
  title1: 'text-[30px] font-bold leading-[120%] tracking-[-0.02em]',
  title2: 'text-[24px] font-bold leading-[120%] tracking-[-0.02em]',
  title3: 'text-[20px] font-bold leading-[120%] tracking-[-0.02em]',
  'subtitle1-bold': 'text-[18px] font-bold leading-[150%] tracking-[-0.02em]',
  'subtitle2-bold': 'text-[16px] font-bold leading-[150%] tracking-[-0.02em]',
  'subtitle2-medium': 'text-[16px] font-medium leading-[150%] tracking-[-0.02em]',
  'text1-bold': 'text-[14px] font-bold leading-[150%] tracking-[-0.02em]',
  'text1-medium': 'text-[14px] font-medium leading-[150%] tracking-[-0.02em]',
  'text1-regular': 'text-[14px] font-normal leading-[150%] tracking-[-0.02em]',
  'text2-bold': 'text-[12px] font-bold leading-[150%] tracking-[-0.02em]',
  'text2-medium': 'text-[12px] font-medium leading-[150%] tracking-[-0.02em]',
  'caption-bold': 'text-[10px] font-bold leading-[150%] tracking-[-0.02em]',
  'caption-medium': 'text-[10px] font-medium leading-[150%] tracking-[-0.02em]',
  button1: 'text-[18px] font-semibold leading-normal tracking-[-0.02em]',
  button2: 'text-[16px] font-semibold leading-normal tracking-[-0.02em]',
  button3: 'text-[14px] font-semibold leading-normal tracking-[-0.02em]',
  button4: 'text-[14px] font-medium leading-normal tracking-[-0.02em]',
  button5: 'text-[12px] font-semibold leading-normal tracking-[-0.02em]',
  question: 'text-[20px] font-bold leading-[150%] tracking-[-0.02em]',
}

const TextColorStyles: Record<TextColor, string> = {
  primary: 'var(--color-gray-900)',
  'primary-inverse': 'var(--color-white)',
  secondary: 'var(--color-gray-700)',
  'secondary-inverse': 'var(--color-gray-100)',
  sub: 'var(--color-gray-500)',
  caption: 'var(--color-gray-300)',
  success: 'var(--color-green-500)',
  critical: 'var(--color-red-500)',
  info: 'var(--color-blue-500)',
  accent: 'var(--color-orange-500)',
  selected: 'var(--color-orange-600)',
  'placeholder-01': 'var(--color-gray-400)',
  'placeholder-02': 'var(--color-gray-200)',
  disabled: 'var(--color-gray-300)',
  right: 'var(--color-green-500)',
  wrong: 'var(--color-red-500)',
}

const Text = forwardRef(
  <T extends ElementType = 'div'>(
    { typography, color, className, as, children, ...props }: TextProps<T>,
    ref?: React.ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || ('div' as ElementType)

    return (
      <Component
        ref={ref}
        className={cn(
          typography && typographyStyles[typography],
          color && TextColorStyles[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'

export default Text
