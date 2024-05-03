import HeaderLayout from '@/components/header-layout'
import { LeftNavLayout } from '@/components/left-nav-layout'
import { Viewport } from 'next'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LeftNavLayout>
      <div className="relative mx-auto w-full max-w-[calc(1032px+40px)] px-[20px]">
        <HeaderLayout />
        {children}
      </div>
    </LeftNavLayout>
  )
}

export default Layout
