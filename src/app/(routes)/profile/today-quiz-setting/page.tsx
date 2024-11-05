import SetNote from '@/features/quiz/today-quiz-setting/components/set-note'
import SetQuizCount from '@/features/quiz/today-quiz-setting/components/set-quiz-count'
import { TodayQuizSettingProvider } from '@/features/quiz/today-quiz-setting/context/today-quiz-setting-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import FixedBottomButtons from '@/features/quiz/today-quiz-setting/components/fixed-bottom-buttons'

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

        <FixedBottomButtons />
      </main>
    </TodayQuizSettingProvider>
  )
}

export default TodayQuizSettingPage
