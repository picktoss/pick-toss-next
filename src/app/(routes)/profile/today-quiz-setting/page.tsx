import SetQuizCount from '@/features/quiz/components/today-quiz-setting/set-quiz-count'
import FixedBottomButtons from '@/features/quiz/components/today-quiz-setting/fixed-bottom-buttons'
import SetDocument from '@/features/quiz/components/today-quiz-setting/set-document'

const TodayQuizSettingPage = () => {
  return (
    <main className="h-[calc(100dvh-54px-88px)] w-full overflow-y-auto px-[16px]">
      <SetQuizCount />

      <SetDocument />

      <FixedBottomButtons />
    </main>
  )
}

export default TodayQuizSettingPage
