<<<<<<< HEAD:src/app/(routes)/(tabs)/profile/today-quiz-setting/page.tsx
import SetNote from '@/features/quiz/components/today-quiz-setting/set-note'
import SetQuizCount from '@/features/quiz/components/today-quiz-setting/set-quiz-count'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import { Button } from '@/shared/components/ui/button'
=======
import SetNote from '@/features/quiz/today-quiz-setting/components/set-note'
import SetQuizCount from '@/features/quiz/today-quiz-setting/components/set-quiz-count'
import { TodayQuizSettingProvider } from '@/features/quiz/today-quiz-setting/context/today-quiz-setting-context'
import GoBackButton from '@/shared/components/custom/go-back-button'
import Text from '@/shared/components/ui/text'
import FixedBottomButtons from '@/features/quiz/today-quiz-setting/components/fixed-bottom-buttons'
>>>>>>> 397335a77da4eb30ef9fef6f3fc7005a0b47ab22:src/app/(routes)/profile/today-quiz-setting/page.tsx

const TodayQuizSettingPage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <SetQuizCount />

      <SetNote />

<<<<<<< HEAD:src/app/(routes)/(tabs)/profile/today-quiz-setting/page.tsx
      <FixedBottom className="bottom-[88px] right-1/2 flex translate-x-1/2 gap-[6px] pb-[36px]">
        <Button variant={'largeRound'} colors={'tertiary'} className="w-[35%]">
          초기화
        </Button>
        <Button variant={'largeRound'} colors={'primary'} className="w-[65%]">
          저장하기
        </Button>
      </FixedBottom>
    </main>
=======
        <SetNote />

        <FixedBottomButtons />
      </main>
    </TodayQuizSettingProvider>
>>>>>>> 397335a77da4eb30ef9fef6f3fc7005a0b47ab22:src/app/(routes)/profile/today-quiz-setting/page.tsx
  )
}

export default TodayQuizSettingPage
