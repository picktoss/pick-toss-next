import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children, header }) => {
  return (
    <DirectoryProvider>
      {header}
      {children}
    </DirectoryProvider>
  )
}

export default Layout
