import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import NIGHT_SKY_IMG from '@/../../public/images/pro-star-background.png'
import GoBackButton from '@/shared/components/custom/go-back-button'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
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
        <header className="relative z-10 flex h-[54px] w-full items-center px-[16px] text-text-primary-inverse">
          <GoBackButton icon="cancel" />
        </header>

        {children}
      </div>
    </Suspense>
  )
}

export default Layout
