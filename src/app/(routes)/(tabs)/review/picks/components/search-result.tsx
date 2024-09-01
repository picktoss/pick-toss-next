import { SearchKeyPointsResponse } from '@/actions/fetchers/key-point/search-key-points'
import { CommonLayout } from '@/shared/components/common-layout'
import { useQueryClient } from '@tanstack/react-query'
import { SearchForm } from '@/shared/components/search-form'
import { KeyPointCard } from './key-point-card'
import { useToggleBookmarkMutation } from '@/actions/fetchers/key-point/toggle-bookmark/mutation'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

interface Props {
  term: string
  keyPoints: SearchKeyPointsResponse['keyPoints']
  onReSearch: ({ term }: { term: string }) => void
}

export function SearchResult({ term, keyPoints, onReSearch }: Props) {
  const queryClient = useQueryClient()

  const { mutate: deleteBookmark } = useToggleBookmarkMutation()

  const handleDeleteBookmark = (keyPointId: number) => {
    queryClient.setQueryData<SearchKeyPointsResponse>(
      queries.keyPoints.search(term).queryKey,
      (oldData) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          keyPoints: oldData?.keyPoints.filter((keypoint) => keypoint.id !== keyPointId),
        }
      }
    )

    deleteBookmark({ keyPointId, bookmark: false })
  }

  return (
    <CommonLayout
      title="저장한 pick 검색"
      mobileOptions={{
        hasBackButton: true,
      }}
    >
      <div className="relative min-h-[80vh] pb-[60px]">
        <div className="mt-[28px] px-[20px]">
          <SearchForm
            defaultValue={term}
            onSubmit={onReSearch}
            placeholder="노트명, pick 내용을 입력하세요"
          />
        </div>

        {keyPoints.length ? (
          <div className="mt-[20px] px-[20px] lg:mt-[48px]">
            <div className="text-body2-medium text-gray-08">
              검색결과 <span className="text-orange-06">{keyPoints.length}개</span>
            </div>

            <div className="mt-[16px] flex flex-col gap-[24px] lg:grid lg:grid-cols-2 lg:gap-[16px]">
              {keyPoints.map((keyPoint) => (
                <KeyPointCard
                  key={keyPoint.id}
                  keyPoint={keyPoint}
                  handleDeleteBookmark={handleDeleteBookmark}
                  highlightTo={term}
                />
              ))}
            </div>
          </div>
        ) : (
          <NoResult />
        )}
      </div>
    </CommonLayout>
  )
}

function NoResult() {
  return (
    <div className="center text-center text-text-regular text-gray-09">
      검색 결과가 없습니다
      <br />
      다른 검색어를 입력해보세요
    </div>
  )
}
