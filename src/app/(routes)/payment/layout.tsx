import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import NIGHT_SKY_IMG from '@/../../public/images/pro-star-background.png'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {
  header: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ children, header }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <div
        className="fixed size-full min-h-screen max-w-mobile"
        style={{
          backgroundImage: `url(${NIGHT_SKY_IMG.src})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {header}
        {children}
      </div>
    </Suspense>
  )
}

export default Layout
