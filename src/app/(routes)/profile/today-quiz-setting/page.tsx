import SetNote from '@/features/quiz/components/today-quiz-setting/set-note'
import SetQuizCount from '@/features/quiz/components/today-quiz-setting/set-quiz-count'
import FixedBottomButtons from '@/features/quiz/components/today-quiz-setting/fixed-bottom-buttons'

const TodayQuizSettingPage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <SetQuizCount />

      <SetNote />

      <FixedBottomButtons />
    </main>
  )
}

export default TodayQuizSettingPage
