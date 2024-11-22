import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { EditDocumentProvider } from '@/features/modify/context/edit-document-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <EditDocumentProvider>
      {header}
      {children}
    </EditDocumentProvider>
  )
}

export default Layout
