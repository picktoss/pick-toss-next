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
  return <LeftNavLayout>{children}</LeftNavLayout>
}

export default Layout
