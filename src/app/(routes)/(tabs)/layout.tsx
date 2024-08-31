import LeftSidebar from '@/shared/components/left-sidebar'
import BottomNavigation from '@/shared/components/bottom-navigation'
import { Viewport } from 'next'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
}

const TabsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="lg:flex lg:justify-end">
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>
      <div className="lg:flex lg:w-[calc(100vw-240px)] lg:justify-center">
        <div className="flex min-h-screen flex-col pb-[84px] lg:block lg:min-h-0 lg:w-full lg:max-w-[1072px] lg:pb-0">
          {children}
        </div>
      </div>
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  )
}

export default TabsLayout
