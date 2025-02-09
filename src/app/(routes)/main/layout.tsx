import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <div className="center min-h-screen w-dvw max-w-mobile bg-background-base-02">
      <BottomNavLayout where="홈">
        {header}
        {children}
      </BottomNavLayout>
    </div>
  )
}

export default Layout
