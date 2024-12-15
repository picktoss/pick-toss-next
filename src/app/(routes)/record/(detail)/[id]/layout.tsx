import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children, header }) => {
  return (
    <>
      {header}
      {children}
    </>
  )
}

export default Layout
