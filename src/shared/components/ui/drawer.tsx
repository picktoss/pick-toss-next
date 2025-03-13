'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/shared/lib/utils'
import { useDynamicThemeColor } from '@/shared/hooks/use-dynamic-theme-color'
import { isMobile } from 'react-device-detect'

const DrawerContext = React.createContext<{ direction: 'top' | 'bottom' | 'left' | 'right' }>({
  direction: 'bottom',
})

const Drawer = ({
  shouldScaleBackground = true,
  direction = 'bottom',
  ...props
}: React.ComponentProps<
  typeof DrawerPrimitive.Root & { direction?: 'top' | 'bottom' | 'left' | 'right' }
>) => (
  <DrawerContext.Provider value={{ direction }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      direction={direction}
      {...props}
    />
  </DrawerContext.Provider>
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext)

  const metaTag = document.querySelector('meta[name="theme-color"]')

  const prevColorRef = React.useRef<string | null>(null)
  if (!prevColorRef.current) {
    prevColorRef.current = metaTag?.getAttribute('content') ?? '#ffffff'
  }

  const statusBarColor = direction === 'bottom' ? '#313132' : null
  const unmountColor = direction === 'bottom' ? prevColorRef.current : null

  useDynamicThemeColor(isMobile, statusBarColor, unmountColor)

  return (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  )
})
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    hideSidebar?: boolean
    overlayProps?: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
  }
>(({ className, children, hideSidebar, overlayProps, ...props }, ref) => {
  const { direction } = React.useContext(DrawerContext)

  return (
    <DrawerPortal>
      <DrawerOverlay {...overlayProps} />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'allow-swipe fixed z-50 mt-24 flex flex-col bg-white outline-none',
          direction === 'bottom' && 'inset-x-0 bottom-0 h-auto rounded-t-[20px]',
          direction === 'top' && '!inset-x-0 !top-0 h-auto',
          direction === 'left' && '!inset-y-0 !left-0 !h-full w-[80%]',
          direction === 'right' && '!inset-y-0 !right-0 !h-full w-[80%]',
          className
        )}
        {...props}
      >
        {!hideSidebar && (
          <div className="mx-auto mt-[8px] h-[4px] w-[48px] rounded-full bg-icon-tertiary" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-[20px] pb-[36px]', className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
