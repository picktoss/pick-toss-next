import PageTitle from '@/components/page-title'
import icons from '@/constants/icons'
import QuizBanner from './components/quiz-banner'
import QuizMaker from './components/quiz-maker'
import Achievements from './components/achievements'
import { getTodayQuizSetId } from '@/apis/fetchers/quiz/get-today-quiz-set-id'

export default async function Main() {
  const { quizSetId, type } = await getTodayQuizSetId()

  return (
    <main className="flex flex-col px-[20px] pb-[40px]">
      <PageTitle title="파워업 퀴즈" icon={icons.powerUpQuiz} />

      <section className="mb-[56px] flex flex-col gap-[24px] lg:flex-row lg:gap-[10px]">
        <QuizBanner type={type} quizSetId={quizSetId} />
        <Achievements />
      </section>

      <QuizMaker />
    </main>
  )
}
