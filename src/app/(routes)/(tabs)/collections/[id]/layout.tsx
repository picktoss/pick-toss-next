import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}
interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return <main>{children}</main>
}

export default Layout
