import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import Icon from '@/shared/components/custom/icon'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="flex h-[54px] w-full max-w-mobile items-center justify-between bg-background-base-02 px-[18px]">
        <Icon name="logo" className="h-[36px]" />
      </header>
      {children}
    </>
  )
}

export default Layout
