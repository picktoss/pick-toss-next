import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

interface InnerLayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<InnerLayoutProps> = ({ children }) => {
  return <main>{children}</main>
}

export default Layout
