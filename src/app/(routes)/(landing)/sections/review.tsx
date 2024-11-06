import { Section } from '../components/section'
import {
  FrequentlyWrongDocumentIcon,
  LongFrequentlyWrongDocumentIcon,
  PercentageGraphIcon,
  PercentageOfCorrectAnswersGraphIcon,
  ReviewInfoIcon,
} from '../svgs'

export function Review() {
  return (
    <>
      <Section
        title="복습 체크"
        description={
          <>
            내가 푼 퀴즈 현황을 체크하고,
            <br />
            자주 틀린 내용을 복습해요
          </>
        }
        className="mt-[124px] xl:hidden"
      >
        <div className="mt-[32px]">
          <div className="flex flex-col items-center *:mt-[-8px]">
            <ReviewInfoIcon />
            <PercentageOfCorrectAnswersGraphIcon />
            <FrequentlyWrongDocumentIcon />
          </div>
        </div>
      </Section>

      <section className="relative mt-[213px] hidden h-[669.4px] xl:block">
        <div className="mx-auto flex max-w-[1032px] flex-col *:shrink-0">
          <div>
            <div className="text-h3-bold text-orange-06">노트창고</div>
            <div className="mt-[16px] text-h1 text-gray-09">
              내가 푼 퀴즈 현황을 체크하고,
              <br />
              자주 틀린 내용을 복습해요
            </div>
          </div>

          <div className="relative z-20 mt-[-35px] h-[527px] w-full">
            <ReviewInfoIcon className="absolute left-[-17px] top-[85px]" />
            <PercentageOfCorrectAnswersGraphIcon className="absolute bottom-[-30px] left-[137px]" />
            <LongFrequentlyWrongDocumentIcon className="absolute right-[-22px] top-[-10px]" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0">
          <PercentageGraphIcon />
        </div>
      </section>
    </>
  )
}
