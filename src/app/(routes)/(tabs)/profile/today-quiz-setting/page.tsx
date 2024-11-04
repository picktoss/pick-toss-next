import SetNote from '@/features/quiz/today-quiz-setting/components/set-note'
import SetQuizCount from '@/features/quiz/today-quiz-setting/components/set-quiz-count'
import { TodayQuizSettingProvider } from '@/features/quiz/today-quiz-setting/context/today-quiz-setting-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import TwoRatioButton from '@/shared/components/custom/two-ratio-button'
import Text from '@/shared/components/ui/text'

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

        <TwoRatioButton
          buttonA={{ label: '초기화', className: 'w-[35%]' }}
          buttonB={{ label: '저장하기', className: 'w-[65%]' }}
        />
      </main>
    </TodayQuizSettingProvider>
  )
}

export default TodayQuizSettingPage
