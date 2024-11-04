import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <main>
      {header}
      {children}
    </main>
  )
}

export default Layout
