import { Section } from '../components/section'
import {
  ContinuousQuizDatesIcon,
  FireworkIcon,
  OrangeGradientIcon,
  TodayQuizScreenIcon,
  TrophyIcon,
} from '../svgs'

export function TodayQuiz() {
  return (
    <Section
      title="오늘의 퀴즈"
      description={
        <div className="h-[104px]">
          매일 나의 노트로부터
          <br />
          자동으로 만들어진
          <br />
          <div className="flex">
            퀴즈를 풀어보세요 <FireworkIcon />
          </div>
        </div>
      }
      className="mt-[54px]"
    >
      <div className="bg-orange-gradient pb-[60.5px] pt-[54px]">
        <div className="relative h-[361.5px]">
          <div className="absolute right-1/2 translate-x-1/2">
            <OrangeGradientIcon />
          </div>
          <div className="absolute right-1/2 translate-x-1/2 pl-[14px]">
            <TodayQuizScreenIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <TrophyIcon />
        <div className="mt-[24px]">
          <ContinuousQuizDatesIcon />
        </div>
        <div className="mt-[23.6px] text-text2-bold text-gray-09">
          꾸준히 퀴즈를 풀면, 어느새 마스터가 되어 있을 거예요
        </div>
      </div>
    </Section>
  )
}
