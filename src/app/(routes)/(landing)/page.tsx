import { Button } from '@/components/ui/button'
import { Header } from './components/header'
import { PowerUpQuiz } from './sections/power-up-quiz'
import { Repository } from './sections/repository'
import { Review } from './sections/review'
import { TodayQuiz } from './sections/today-quiz'
import { ArrowRightIcon, LogoTextIcon, LongChevronDownIcon } from './svgs'
import mobileSkySource from './assets/mobile-sky.png'
import Image from 'next/image'
import { Footer } from './components/footer'

export default function Landing() {
  return (
    <div className="bg-white scrollbar-hide">
      <Header />

      <div className="relative flex h-[calc(100vh-60px)] w-full flex-col justify-between pt-[128.5px]">
        <Image src={mobileSkySource} fill alt="" />
        <div className="z-40">
          <div className="text-center text-h2-bold text-gray-09">
            나의 <span className="text-blue-06">노트</span>에서 출발해
            <br />
            매일 도착하는 <span className="text-orange-06">퀴즈</span>
          </div>

          <div className="mt-[16px] h-[61px] text-center">
            내가 등록한 노트로부터 만들어진 퀴즈를 풀며
            <br />
            매일 5분으로 배운 것들을 나의 것으로 만들어보세요
          </div>

          <div className="mt-[33px] flex justify-center">
            <Button
              variant="gradation"
              className="flex h-[52px] w-[190px] gap-[8px] rounded-[32px] !text-body1-bold text-white"
            >
              <div>픽토스 시작하기</div>
              <ArrowRightIcon />
            </Button>
          </div>
        </div>

        <div className="z-40 flex flex-col items-center gap-[5.8px] pb-[30px]">
          <LogoTextIcon />
          <LongChevronDownIcon />
        </div>
      </div>

      <div>
        <Repository />
        <PowerUpQuiz />
        <TodayQuiz />
        <Review />
      </div>

      <div className="mt-[178px] text-center">
        <h2 className="text-h3-bold text-gray-09">다양한 분야를 픽토스의 퀴즈로</h2>
        <p className="mt-[16px] text-text-medium text-gray-08">
          전공 요점정리, 취미생활, 자격증 공부, 상식 메모까지.
          <br />
          노트만 있다면, 무엇이든 픽토스의 퀴즈로 복습할 수 있어요
        </p>
        <div></div>
      </div>

      <Footer />
    </div>
  )
}
