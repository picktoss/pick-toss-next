import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {}

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <main>{children}</main>
}

export default Layout
