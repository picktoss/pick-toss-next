import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children, header }) => {
  return (
    <div className="flex h-fit w-screen max-w-mobile flex-col overflow-hidden">
      {header}
      {children}
    </div>
  )
}

export default Layout
