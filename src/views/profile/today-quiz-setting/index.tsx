import GoBackButton from '@/shared/components/go-back-button'
import Text from '@/shared/components/ui/text'
import SetQuizCount from './components/set-quiz-count'
import SetNote from './components/set-note'
import FixedBottom from './components/fixed-bottom'
import { TodayQuizSettingProvider } from './context/today-quiz-setting-context'

const TodayQuizSetting = () => {
  return (
    <TodayQuizSettingProvider>
      <header className="relative flex h-[54px] w-full items-center bg-background-base-01 px-[16px]">
        <GoBackButton />
        <Text typography="subtitle2-medium" className="center">
          오늘의 퀴즈 관리
        </Text>
      </header>

      <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
        <SetQuizCount />

        <SetNote />

        <FixedBottom />
      </main>
    </TodayQuizSettingProvider>
  )
}

export default TodayQuizSetting
