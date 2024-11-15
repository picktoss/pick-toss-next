import Text from '@/shared/components/ui/text'
import ReviewTop5Item from '../review-top5-item'

const ReviewTop5Container = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <div className="flex w-full flex-col gap-[20px]">
      <Text typography="title3">복습 필수 노트 TOP 5</Text>

      {isEmpty ? (
        <div className="flex-center h-[260px] w-full rounded-[20px] bg-background-base-01">
          <Text typography="text1-medium" color="sub">
            아직 노트가 없어요
          </Text>
        </div>
      ) : (
        <div className="h-fit w-full rounded-[20px] bg-background-base-01">
          {Array.from({ length: 5 }).map((_, index) => (
            <ReviewTop5Item
              key={index} // item.id
              ranking={index + 1}
              documentTitle={'중간고사 요점정리'}
              directory={'전공공부'}
              reviewCount={7}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewTop5Container
