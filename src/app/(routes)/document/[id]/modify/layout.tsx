import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { EditDocumentProvider } from '@/features/modify/context/edit-document-context'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <DirectoryProvider>
      <EditDocumentProvider>
        {header}
        {children}
      </EditDocumentProvider>
    </DirectoryProvider>
  )
}

export default Layout
