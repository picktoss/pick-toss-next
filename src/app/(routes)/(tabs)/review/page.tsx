import { CommonLayout } from '@/shared/components/common-layout'
import Icon from '@/shared/components/icon'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { currentMonth } from '@/shared/utils/date'
import Review from '@/views/review'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

const Page = async () => {
  const queryClient = getQueryClient()
  await Promise.all([
    queryClient.prefetchQuery(queries.keyPoints.list()),
    queries.document.topFive(),
    queries.category.list(),
    queries.quiz.weekAnswerRate(0),
    queries.quiz.monthAnswerRate({
      categoryId: 0,
      date: {
        year: 2024,
        month: currentMonth(),
      },
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CommonLayout
        title={
          <div className="flex gap-[8px]">
            <span>복습 체크</span>
            <Icon name="ranking" className="size-[24px] xl:size-[32px]" />
          </div>
        }
        mobileOptions={{
          hasNotifications: true,
        }}
      >
        <Review />
      </CommonLayout>
    </HydrationBoundary>
  )
}

export default Page
