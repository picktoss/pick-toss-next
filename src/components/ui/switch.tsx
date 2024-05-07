'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  displayStatus?: boolean
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, Props>(
  ({ className, displayStatus, ...props }, ref) => {
    const switchContent = (
      <SwitchPrimitives.Root
        className={cn(
          'peer inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-04 data-[state=checked]:bg-orange-05',
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none size-4 rounded-full bg-gray-01 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 block *:data-[state=unchecked]:hidden relative',
          )}
        >
          <Image
            src="/icons/check.svg"
            alt=""
            width={9}
            height={7}
            className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
          />
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>
    )

    return displayStatus ? (
      <label className="inline-flex w-[80px] flex-row-reverse gap-[9px]">
        {switchContent}
        <span className="text-[15px] font-[700] text-gray-07 peer-data-[state=checked]:text-orange-05 peer-data-[state=checked]:before:content-['ON'] peer-data-[state=unchecked]:before:content-['OFF']" />
      </label>
    ) : (
      switchContent
    )
  },
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
