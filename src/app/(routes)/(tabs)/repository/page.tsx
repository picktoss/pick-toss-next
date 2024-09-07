import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import Repository from '@/views/repository'

const Page = async () => {
  const queryClient = getQueryClient()

  // 서버에서 미리 데이터 prefetching
  await Promise.all([queryClient.prefetchQuery(queries.category.list())])

  // 클라이언트로 데이터를 전달하기 위해 queryClient를 dehydrate 처리
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Repository />
    </HydrationBoundary>
  )
}

export default Page
