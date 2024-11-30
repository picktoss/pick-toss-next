import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import Loading from '@/shared/components/custom/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Suspense fallback={<Loading center />}>{children}</Suspense>
    </main>
  )
}

export default Layout
