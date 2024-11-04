import { FunctionComponent, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { TodayQuizSettingProvider } from '@/features/quiz/context/today-quiz-setting-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'

export const metadata: Metadata = {}

interface LayoutProps extends PropsWithChildren {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <TodayQuizSettingProvider>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          오늘의 퀴즈 관리
        </Text>
      </header>

      {children}
    </TodayQuizSettingProvider>
  )
}

export default Layout
