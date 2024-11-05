import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <BottomNavLayout where="마이">
      <InquiryProvider>
        {header}
        {children}
      </InquiryProvider>
    </BottomNavLayout>
  )
}

export default Layout
