import SetNote from '@/features/quiz/components/today-quiz-setting/set-note'
import SetQuizCount from '@/features/quiz/components/today-quiz-setting/set-quiz-count'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'

const TodayQuizSettingPage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <SetQuizCount />

      <SetNote />

      <FixedBottom className="bottom-[88px] right-1/2 flex translate-x-1/2 gap-[6px] pb-[36px]">
        <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
          초기화
        </Button>
        <Button variant={'largeRound'} colors={'primary'} className="w-[65%]">
          저장하기
        </Button>
      </FixedBottom>
    </main>
  )
}

export default TodayQuizSettingPage
