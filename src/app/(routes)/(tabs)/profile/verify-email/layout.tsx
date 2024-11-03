import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          이메일 설정
        </Text>
      </header>

      <main className="flex h-[calc(100dvh-54px-88px)] w-full flex-col overflow-y-auto px-[16px]">
        {children}
      </main>
    </>
  )
}

export default Layout
