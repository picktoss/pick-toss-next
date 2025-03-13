import RecordMain from '@/features/record/screen/record-main'
import { getQueryClient } from '@/shared/lib/tanstack-query/client'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

const RecordPage = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(queries.quiz.consecutiveDays())

  return <RecordMain />
}

export default RecordPage
