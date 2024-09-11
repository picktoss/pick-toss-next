import { SavedPicksLink } from './components/saved-picks-link'
import { TopFive } from './components/top-five'
import { QuizAnalysis } from './components/quiz-analysis'
import { QuizArchiveLink } from './components/quiz-archive-link'
import { QuizReview } from './components/quiz-review'

const Review = () => {
  return (
    <main className="mt-[18px] flex w-full flex-col gap-[24px] xl:mt-[24px] xl:flex-row xl:gap-[22px] xl:px-[20px] xl:pb-[50px]">
      <div className="flex flex-col gap-[24px] xl:max-w-[490px] xl:gap-[16px]">
        <section className="mt-[8px] flex flex-col gap-[12px] px-[20px] xl:mt-0 xl:flex-row xl:px-0">
          <QuizArchiveLink className="flex-1" />
          <SavedPicksLink className="flex-1" />
        </section>
        <QuizReview />
        <TopFive />
      </div>
      <QuizAnalysis />
    </main>
  )
}

export default Review
