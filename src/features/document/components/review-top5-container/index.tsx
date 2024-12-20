'use client'

import Text from '@/shared/components/ui/text'
import ReviewTop5Item from '../review-top5-item'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Loading from '@/shared/components/custom/loading'

interface Props {
  isEmpty?: boolean
}

const ReviewTop5Container = ({ isEmpty }: Props) => {
  const { data, isPending } = useQuery(queries.document.reviewNeeds())
  const isEmptyReviewNeeds = isEmpty ?? (!data?.documents || data.documents.length === 0)

  if (isPending) {
    return (
      <div className="flex-center w-full">
        <Loading className="z-10" />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <Text typography="title3">복습 필수 노트 TOP 5</Text>

      {isEmptyReviewNeeds ? (
        <div className="flex-center h-[260px] w-full rounded-[20px] bg-background-base-01">
          <Text typography="text1-medium" color="sub">
            아직 노트가 없어요
          </Text>
        </div>
      ) : (
        <div className="h-fit w-full rounded-[20px] bg-background-base-01">
          {data?.documents.map((document, index) => (
            <ReviewTop5Item
              key={document.id}
              ranking={index + 1}
              documentId={document.id}
              documentTitle={document.name}
              directory={document.directory.name}
              reviewCount={document.reviewNeededQuizCount}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewTop5Container
