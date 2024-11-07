import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import NIGHT_SKY_IMG from '@/../../public/images/star-background.png'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ header, children }) => {
  return (
    <div
      className="size-full min-h-screen"
      style={{
        backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {header}
      {children}
    </div>
  )
}

export default Layout
