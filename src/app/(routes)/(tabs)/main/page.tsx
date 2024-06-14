import icons from '@/constants/icons'
import QuizBanner from './components/quiz-banner'
import QuizMaker from './components/quiz-maker'
import Achievements from './components/achievements'
import { CommonLayout } from '@/components/common-layout'
import Image from 'next/image'
import { RewordDialog } from './components/reward-alert'

interface Props {
  searchParams: {
    reward?: string
  }
}

export default function Main({ searchParams }: Props) {
  return (
    <CommonLayout
      title={{
        label: '파워업 퀴즈',
        icon: (
          <div className="relative h-[21.67px] w-[25.05px] lg:h-[30px] lg:w-[34.69px]">
            <Image src={icons.powerUpQuiz} fill alt="" />
          </div>
        ),
      }}
      mobileOptions={{
        hasStars: true,
        hasNotifications: true,
      }}
    >
      <main className="flex flex-col px-[20px] pb-[40px] pt-[10px] lg:pt-[28px]">
        <section className="mb-[56px] flex flex-col gap-[24px] lg:flex-row lg:gap-[10px]">
          <QuizBanner />
          <Achievements />
        </section>

        <QuizMaker />
      </main>
      {searchParams?.reward && <RewordDialog reward={searchParams?.reward} />}
    </CommonLayout>
  )
}
