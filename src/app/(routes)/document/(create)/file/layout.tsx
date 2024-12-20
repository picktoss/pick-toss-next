import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import Loading from '@/shared/components/custom/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <Suspense fallback={<Loading center />}>{children}</Suspense>
}

export default Layout
