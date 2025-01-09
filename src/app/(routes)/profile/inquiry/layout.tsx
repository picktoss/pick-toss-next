import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <InquiryProvider>
      {header}
      {children}
    </InquiryProvider>
  )
}

export default Layout
