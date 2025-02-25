import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'
import { DocumentProvider } from '@/features/document/contexts/document-context'
import RootLoading from '@/app/loading'
import { DocumentDetailProvider } from '@/features/document/contexts/document-detail-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <DirectoryProvider>
        <DocumentProvider>
          <DocumentDetailProvider>
            {header}
            {children}
          </DocumentDetailProvider>
        </DocumentProvider>
      </DirectoryProvider>
    </Suspense>
  )
}

export default Layout
