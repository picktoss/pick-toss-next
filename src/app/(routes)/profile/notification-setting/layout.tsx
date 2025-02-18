import { FunctionComponent, PropsWithChildren, Suspense } from 'react'
import type { Metadata } from 'next'
import BottomNavLayout from '@/shared/components/custom/bottom-nav-layout'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import RootLoading from '@/app/loading'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Suspense fallback={<RootLoading />}>
      <BottomNavLayout where="마이">
        <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
          <GoBackButton />
          <Text typography="subtitle2-medium" className="center">
            알림 설정
          </Text>
        </header>

        {children}
      </BottomNavLayout>
    </Suspense>
  )
}

export default Layout
