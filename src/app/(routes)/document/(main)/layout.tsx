import { FunctionComponent, PropsWithChildren } from 'react'
import { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import { DirectoryProvider } from '@/features/document/contexts/directory-context'
import ClientLayout from '@/shared/components/custom/client-layout'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <BottomNavLayout where="퀴즈 노트">
      <ClientLayout>
        <DirectoryProvider>
          <div className="flex h-[calc(100dvh-88px)] w-full flex-col overflow-hidden bg-background-base-02 text-text-primary">
            {header}
            {children}
          </div>
        </DirectoryProvider>
      </ClientLayout>
    </BottomNavLayout>
  )
}

export default Layout
