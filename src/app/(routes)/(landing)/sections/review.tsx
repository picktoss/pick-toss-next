import { Section } from '../components/section'
import {
  FrequentlyWrongNoteIcon,
  PercentageOfCorrectAnswersGraphIcon,
  ReviewInfoIcon,
} from '../svgs'

export function Review() {
  return (
    <Section
      title="복습 체크"
      description={
        <>
          내가 푼 퀴즈 현황을 체크하고,
          <br />
          자주 틀린 내용을 복습해요
        </>
      }
      className="mt-[124px]"
    >
      <div className="mt-[32px]">
        <div className="flex flex-col items-center *:mt-[-8px]">
          <ReviewInfoIcon />
          <PercentageOfCorrectAnswersGraphIcon />
          <FrequentlyWrongNoteIcon />
        </div>
      </div>
    </Section>
  )
}
