import HeaderLayout from '@/components/header-layout'
import { LeftNavLayout } from '@/components/left-nav-layout'
import Profile from '@/components/profile'
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
      <div className="mx-auto w-full max-w-[1440px] px-20">
        <HeaderLayout />
        {children}
      </div>
      <Profile />
    </LeftNavLayout>
  )
}

export default Layout
