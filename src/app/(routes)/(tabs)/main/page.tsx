import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { currentMonth } from '@/shared/utils/date'
import Main from '@/views/main'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

interface Props {
  searchParams: {
    reward?: string
  }
}

const Page = async ({ searchParams: { reward } }: Props) => {
  const queryClient = getQueryClient()

  // 서버에서 미리 데이터 prefetching
  await Promise.all([
    queryClient.prefetchQuery(queries.category.list()),
    queryClient.prefetchQuery(queries.quiz.today()),
    queryClient.prefetchQuery(
      queries.quiz.monthAnswerRate({
        categoryId: 0,
        date: {
          year: 2024,
          month: currentMonth(),
        },
      })
    ),
  ])

  // 클라이언트로 데이터를 전달하기 위해 queryClient를 dehydrate 처리
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Main reward={reward} />
    </HydrationBoundary>
  )
}

export default Page
