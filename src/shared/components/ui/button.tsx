import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[4px] whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        largeRound: 'h-[52px] w-[260px] rounded-full !text-button1',
        mediumSquare: 'h-[44px] w-fit rounded-[12px] px-[39px] !text-button2',
        mediumRound: 'h-[44px] w-fit rounded-full px-[39px] !text-button2',
        smallSquare: 'h-[36px] w-fit rounded-[10px] px-[16px] !text-button4',
        smallRound: 'h-[32px] w-fit rounded-full px-[14px] !text-button3',
        tinySquare: 'h-[28px] w-fit rounded-[4px] px-[8px] !text-button5',
        mediumIcon: 'size-[52px] rounded-full !text-icon-system',
      },
      colors: {
        special: 'bg-gradient-to-r from-blue-400 from-0% via-[#FFA25F] to-orange-500 to-70%',
        primary:
          'bg-button-fill-primary text-button-label-primary hover:bg-button-fill-primary-hover',
        'primary-loading': 'bg-button-fill-primary-loading text-button-label-primary',
        secondary: 'bg-button-fill-secondary text-button-label-secondary',
        tertiary: 'bg-button-fill-tertiary text-button-label-tertiary',
        outlined: 'border border-border-default bg-button-fill-outlined text-button-label-tertiary',
        selected: 'bg-button-fill-selected text-button-label-selected',
        unselected: 'bg-button-fill-unselected text-button-label-unselected',
      },
    },
    defaultVariants: {
      variant: 'largeRound',
      colors: 'primary',
    },
  }
)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, colors, asChild = false, left, right, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, colors, className }),
          variant === 'mediumSquare' && left && 'pl-[25px] pr-[29px]',
          variant === 'mediumSquare' && right && 'pr-[23px] pl-[31px] gap-[8px]',
          variant === 'mediumRound' && left && 'pl-[21px] pr-[29px] gap-[8px]',
          variant === 'mediumRound' && right && 'pr-[23px] pl-[31px] gap-[8px]',
          variant === 'smallSquare' && left && 'pl-[12px] pr-[14px]',
          variant === 'smallSquare' && right && 'pr-[12px] pl-[14px]',
          variant === 'smallRound' && left && 'pl-[10px]',
          variant === 'smallRound' && right && 'pr-[10px]'
        )}
        ref={ref}
        {...props}
      >
        {left && left}
        {children}
        {right && right}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
