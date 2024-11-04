import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <BottomNavLayout where="컬렉션">
      <div className="flex flex-col">
        {header}
        {children}
      </div>
    </BottomNavLayout>
  )
}

export default Layout
