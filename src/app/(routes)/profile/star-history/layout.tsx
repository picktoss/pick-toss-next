import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/bottom-nav-layout'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <BottomNavLayout where="마이">{children}</BottomNavLayout>
}

export default Layout
