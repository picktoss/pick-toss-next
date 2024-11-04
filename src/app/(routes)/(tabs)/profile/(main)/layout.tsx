import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import Header from '@/features/user/header'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  )
}

export default Layout
