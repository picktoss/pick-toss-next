import PageTitle from '@/components/page-title'
import icons from '@/constants/icons'
import QuizBanner from './components/quiz-banner'
import QuizMaker from './components/quiz-maker'
import Achievements from './components/achievements'

export default function Main() {
  return (
    <main className="flex flex-col px-[20px] pb-[40px]">
      <PageTitle title="파워업 퀴즈" icon={icons.powerUpQuiz} />

      <section className="mb-[56px] flex flex-col gap-[24px] lg:flex-row lg:gap-[10px]">
        <QuizBanner />
        <Achievements />
      </section>

      <QuizMaker />
    </main>
  )
}
