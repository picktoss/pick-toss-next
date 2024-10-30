import GoBackButton from '@/shared/components/go-back-button'
import Text from '@/shared/components/ui/text'
import FixedBottom from '@/views/profile/today-quiz-setting/components/fixed-bottom'
import SetNote from '@/views/profile/today-quiz-setting/components/set-note'
import SetQuizCount from '@/views/profile/today-quiz-setting/components/set-quiz-count'
import { TodayQuizSettingProvider } from '@/views/profile/today-quiz-setting/context/today-quiz-setting-context'

const TodayQuizSettingPage = () => {
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

export default TodayQuizSettingPage
