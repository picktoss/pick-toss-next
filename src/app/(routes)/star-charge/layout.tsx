import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import NIGHT_SKY_IMG from '@/../../public/images/star-background.png'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div
      className="fixed size-full min-h-screen max-w-mobile"
      style={{
        backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  )
}

export default Layout
