import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <DirectoryProvider>
        {header}
        {children}
      </DirectoryProvider>
    </Suspense>
  )
}

export default Layout
