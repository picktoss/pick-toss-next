import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <main>
      <Suspense>{children}</Suspense>
    </main>
  )
}

export default Layout
