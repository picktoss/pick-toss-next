import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'
import { DocumentProvider } from '@/features/document/contexts/document-context'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <DirectoryProvider>
        <DocumentProvider>
          {header}
          {children}
        </DocumentProvider>
      </DirectoryProvider>
    </Suspense>
  )
}

export default Layout
