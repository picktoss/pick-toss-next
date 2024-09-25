import icons from '@/constants/icons'
import { CommonLayout } from '@/shared/components/common-layout'
import Image from 'next/image'
import QuizBanner from './components/quiz-banner'
import Achievements from './components/achievements'
import QuizMaker from './components/quiz-maker'
import { RewordDialog } from './components/reward-alert'

export interface MainProps {
  reward?: string
}

const Main = ({ reward }: MainProps) => {
  return (
    <>
      <CommonLayout
        title={
          <div className="flex gap-[8px]">
            파워업 퀴즈
            <div className="relative h-[21.67px] w-[25.05px] lg:h-[30px] lg:w-[34.69px]">
              <Image src={icons.powerUpQuiz} fill alt="" />
            </div>
          </div>
        }
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
      </CommonLayout>
      <RewordDialog reward={reward} />
    </>
  )
}

export default Main
