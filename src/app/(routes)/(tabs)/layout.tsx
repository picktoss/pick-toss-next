import { LeftSidebar } from '@/components/left-sidebar'
import { TabNavigation } from '@/components/tab-nav'
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
    <>
      <div className="hidden justify-center lg:flex">
        <LeftSidebar />
        <div className="ml-[240px] w-full max-w-[1072px] px-[20px]">{children}</div>
      </div>

      <div className="lg:hidden">
        <div className="px-[20px] pb-[124px]">{children}</div>
        <TabNavigation />
      </div>
    </>
  )
}

export default TabsLayout
