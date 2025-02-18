import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children, header }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      {header}
      {children}
    </Suspense>
  )
}

export default Layout
