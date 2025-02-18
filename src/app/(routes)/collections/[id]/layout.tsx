import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <BottomNavLayout where="컬렉션">
        <div className="flex flex-col">
          {header}
          {children}
        </div>
      </BottomNavLayout>
    </Suspense>
  )
}

export default Layout
