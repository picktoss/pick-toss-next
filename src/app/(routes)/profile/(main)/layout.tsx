import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import Header from '@/features/user/header'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <BottomNavLayout where="마이">
        <Header />
        {children}
      </BottomNavLayout>
    </Suspense>
  )
}

export default Layout
