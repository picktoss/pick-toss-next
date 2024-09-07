import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getCategory } from '@/actions/fetchers/category'
import Category from '@/views/category'

interface Props {
  params: {
    categoryId: string
  }
}

const Page = async ({ params: { categoryId } }: Props) => {
  const queryClient = getQueryClient()
  const category = await getCategory({
    categoryId: Number(categoryId),
  })

  const { emoji, name, tag } = category

  // 서버에서 미리 데이터 prefetching
  await Promise.all([
    queryClient.prefetchQuery(queries.document.list(Number(categoryId), 'createdAt')),
  ])

  // 클라이언트로 데이터를 전달하기 위해 queryClient를 dehydrate 처리
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <Category categoryId={categoryId} emoji={emoji} name={name} tag={tag} />
    </HydrationBoundary>
  )
}

export default Page
