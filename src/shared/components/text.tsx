import React, { ElementType, ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/utils'

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

type TextProps<T extends ElementType> = {
  typography: Typography
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'typography'>

const Text = <T extends ElementType = 'div'>({
  typography,
  className,
  as,
  children,
  ...props
}: TextProps<T>) => {
  const Component = as || 'div'

  return (
    <Component
      className={cn(
        {
          'text-[36px] font-bold leading-[120%] tracking-[-0.02em]': typography === 'hero',
          'text-[30px] font-bold leading-[120%] tracking-[-0.02em]': typography === 'title1',
          'text-[24px] font-bold leading-[120%] tracking-[-0.02em]': typography === 'title2',
          'text-[20px] font-bold leading-[120%] tracking-[-0.02em]': typography === 'title3',
          'text-[18px] font-bold leading-[150%] tracking-[-0.02em]':
            typography === 'subtitle1-bold',
          'text-[16px] font-bold leading-[150%] tracking-[-0.02em]':
            typography === 'subtitle2-bold',
          'text-[16px] font-medium leading-[150%] tracking-[-0.02em]':
            typography === 'subtitle2-medium',
          'text-[14px] font-bold leading-[150%] tracking-[-0.02em]': typography === 'text1-bold',
          'text-[14px] font-medium leading-[150%] tracking-[-0.02em]':
            typography === 'text1-medium',
          'text-[14px] font-normal leading-[150%] tracking-[-0.02em]':
            typography === 'text1-regular',
          'text-[12px] font-bold leading-[150%] tracking-[-0.02em]': typography === 'text2-bold',
          'text-[12px] font-medium leading-[150%] tracking-[-0.02em]':
            typography === 'text2-medium',
          'text-[10px] font-bold leading-[150%] tracking-[-0.02em]': typography === 'caption-bold',
          'text-[10px] font-medium leading-[150%] tracking-[-0.02em]':
            typography === 'caption-medium',
          'text-[18px] font-semibold leading-normal tracking-[-0.02em]': typography === 'button1',
          'text-[16px] font-semibold leading-normal tracking-[-0.02em]': typography === 'button2',
          'text-[14px] font-semibold leading-normal tracking-[-0.02em]': typography === 'button3',
          'text-[14px] font-medium leading-normal tracking-[-0.02em]': typography === 'button4',
          'text-[12px] font-semibold leading-normal tracking-[-0.02em]': typography === 'button5',
          'text-[20px] font-bold leading-[150%] tracking-[-0.02em]': typography === 'question',
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Text
