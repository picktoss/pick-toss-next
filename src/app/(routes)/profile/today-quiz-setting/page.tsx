import SetNote from '@/features/quiz/today-quiz-setting/components/set-note'
import SetQuizCount from '@/features/quiz/today-quiz-setting/components/set-quiz-count'
import { TodayQuizSettingProvider } from '@/features/quiz/today-quiz-setting/context/today-quiz-setting-context'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import GoBackButton from '@/shared/components/custom/go-back-button'
import { Button } from '@/shared/components/ui/button'
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

        <FixedBottom className="flex gap-[6px]">
          <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
            초기화
          </Button>
          <Button variant={'largeRound'} colors={'primary'} className="w-[65%]">
            저장하기
          </Button>
        </FixedBottom>
      </main>
    </TodayQuizSettingProvider>
  )
}

export default TodayQuizSettingPage
