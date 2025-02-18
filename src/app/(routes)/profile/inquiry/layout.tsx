import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import { InquiryProvider } from '@/features/user/contexts/inquiry-context'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <InquiryProvider>
        {header}
        {children}
      </InquiryProvider>
    </Suspense>
  )
}

export default Layout
