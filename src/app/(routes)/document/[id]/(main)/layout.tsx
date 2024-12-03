import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'
import { DocumentProvider } from '@/features/document/contexts/document-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <DirectoryProvider>
      <DocumentProvider>
        {header}
        {children}
      </DocumentProvider>
    </DirectoryProvider>
  )
}

export default Layout
