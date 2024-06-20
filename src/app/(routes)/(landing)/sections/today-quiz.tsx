import { Section } from '../components/section'
import { ContinuousQuizDatesIcon, FireworkIcon, TodayQuizScreenIcon, TrophyIcon } from '../svgs'

export function TodayQuiz() {
  return (
    <>
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
        className="mt-[54px] xl:hidden"
      >
        <div className="bg-orange-gradient pb-[60.5px] pt-[54px]">
          <div className="relative h-[361.5px]">
            <div className="absolute right-1/2 translate-x-1/2">
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

      <section className="mt-[90px] hidden bg-orange-gradient xl:block">
        <div className="mx-auto flex max-w-[1032px] *:shrink-0">
          <TodayQuizScreenIcon
            svgKey="desktop-today-quiz-screen"
            className="ml-[-50px] h-[900px] w-[660px]"
          />
          <div className="ml-[-60px] pt-[230px]">
            <FireworkIcon svgKey="desktop-firework" className="ml-[-14px] h-[68.9px] w-[74px]" />
            <div className="mt-[6px] text-h3-bold text-orange-06">오늘의 퀴즈</div>
            <div className="mt-[16px] text-h1 text-gray-09">
              매일 나의 노트로부터 자동으로
              <br />
              만들어진 퀴즈를 풀어보세요
            </div>
          </div>
        </div>

        <div className="mt-[20px] flex flex-col items-center">
          <TrophyIcon svgKey="desktop-trophy" className="h-[91px] w-[79.4px]" />
          <div className="mt-[34px]">
            <ContinuousQuizDatesIcon className="h-[75px] w-[413px]" />
          </div>
          <div className="mt-[41px] text-h3-bold text-gray-09">
            꾸준히 퀴즈를 풀면, 어느새 마스터가 되어 있을 거예요
          </div>
        </div>
      </section>
    </>
  )
}
