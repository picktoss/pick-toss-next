'use client'

import { CommonLayout } from '@/components/common-layout'
import { GetBookmarksResponse, getBookmarks } from '@/apis/fetchers/key-point/get-bookmarks'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toggleBookmark } from '@/apis/fetchers/key-point/toggle-bookmark'
import Loading from '@/components/loading'
import { NoPicks } from './components/no-picks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { searchKeyPoints } from '@/apis/fetchers/key-point/search-key-points'
import { SearchResult } from './components/search-result'
import { KeyPointCard } from './components/key-point-card'
// import { CategorySelect } from './components/category-select'

export default function Picks() {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const term = useSearchParams().get('term')

  const { data, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: () =>
      getBookmarks({
        accessToken: session?.user.accessToken || '',
      }),
    enabled: session?.user.accessToken != null,
  })

  const { mutate: deleteBookmark } = useMutation({
    mutationKey: ['patch-toggle-bookmark'],
    mutationFn: (keyPointId: number) =>
      toggleBookmark({
        keypointId: keyPointId,
        bookmark: false,
        accessToken: session?.user.accessToken || '',
      }),
    onError: () => {
      /** TODO: 에러 Toast, set back optimistic */
    },
  })

  const handleDeleteBookmark = (keyPointId: number) => {
    queryClient.setQueryData<GetBookmarksResponse>(['bookmarks'], (oldData) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        keyPoints: oldData?.keyPoints.filter((keypoint) => keypoint.id !== keyPointId),
      }
    })

    deleteBookmark(keyPointId)
  }

  const { data: searchData } = useQuery({
    queryKey: ['search-picks', term],
    queryFn: () =>
      searchKeyPoints({
        term: term!,
        accessToken: session?.user.accessToken || '',
      }),
    enabled: term != null && session?.user.accessToken != null,
  })

  const showSearchResult = term != null

  return (
    <>
      {showSearchResult ? (
        <div>
          {!searchData ? (
            <Loading center />
          ) : (
            <SearchResult
              term={term}
              keyPoints={searchData.keyPoints}
              onReSearch={({ term }: { term: string }) => {
                router.push(`${pathname}/?term=${term}`)
              }}
            />
          )}
        </div>
      ) : (
        <CommonLayout
          title={<span className="lg:text-h3-bold">저장한 pick</span>}
          mobileOptions={{
            hasBackButton: true,
            hasSearch: true,
          }}
          searchOptions={{
            placeholder: '노트명, pick 내용을 입력하세요',
            recentTerms: ['식물기반 단백질', '제품', '최근 이슈'],
            onSubmit: ({ term }) => {
              router.push(`${pathname}/?term=${term}`)
            },
          }}
        >
          {isLoading ? (
            <div className="relative h-[80vh] w-full">
              <Loading center />
            </div>
          ) : (
            <>
              {data?.keyPoints.length ? (
                <div className="mt-[18px] px-[20px] pb-[70px] lg:mt-[48px]">
                  <div className="flex items-center justify-between">
                    {/** TODO: 폴더 별 북마크 */}
                    {/* <CategorySelect categories={categories} /> */}
                    <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
                      모든 문서
                    </div>
                    <div className="text-text-medium text-gray-06">
                      {data?.keyPoints.length}개 저장됨
                    </div>
                  </div>
                  <div className="mt-[16px] flex flex-col gap-[24px] lg:grid lg:grid-cols-2 lg:gap-[16px]">
                    {data?.keyPoints.map((keyPoint) => (
                      <KeyPointCard
                        key={keyPoint.id}
                        keyPoint={keyPoint}
                        handleDeleteBookmark={handleDeleteBookmark}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <NoPicks />
              )}
            </>
          )}
        </CommonLayout>
      )}
    </>
  )
}
