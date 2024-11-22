import { FunctionComponent, PropsWithChildren } from 'react'
import { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import { DocumentProvider } from '@/features/document/contexts/document-context'
import { DirectoryProvider } from '@/features/directory/contexts/directory-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <BottomNavLayout where="퀴즈 노트">
      <DirectoryProvider>
        <DocumentProvider>
          <div className="flex h-[calc(100dvh-88px)] w-full flex-col overflow-hidden bg-background-base-02 text-text-primary">
            {header}
            {children}
          </div>
        </DocumentProvider>
      </DirectoryProvider>
    </BottomNavLayout>
  )
}

export default Layout
