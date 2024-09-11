'use client'

import { CommonLayout } from '@/shared/components/common-layout'
import { GetBookmarksResponse } from '@/actions/fetchers/key-point/get-bookmarks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Loading from '@/shared/components/loading'
import { NoPicks } from './components/no-picks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchResult } from './components/search-result'
import { KeyPointCard } from './components/key-point-card'
import { useToggleBookmarkMutation } from '@/actions/fetchers/key-point/toggle-bookmark/mutation'
import { LOCAL_KEY } from '@/constants/local-key'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export default function Picks() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const term = useSearchParams().get('term')

  const { data: keyPoints, isLoading } = useQuery({
    ...queries.keyPoints.list(),
  })

  const { mutate: deleteBookmark } = useToggleBookmarkMutation()

  const handleDeleteBookmark = (keyPointId: number) => {
    queryClient.setQueryData<GetBookmarksResponse['keyPoints']>(
      queries.keyPoints.list().queryKey,
      (keyPoints) => {
        if (!keyPoints) return keyPoints

        return keyPoints?.filter((keypoint) => keypoint.id !== keyPointId)
      }
    )

    deleteBookmark({ keyPointId, bookmark: false })
  }

  const { data: searchData } = useQuery({
    ...queries.keyPoints.search(term!),
    enabled: term != null,
  })

  const handleSubmit = (data: { term: string }, options?: { isResearch: boolean }) => {
    const trimTerm = data.term.trim()

    if (trimTerm === '') return

    const localItem = localStorage.getItem(LOCAL_KEY.SEARCH_PICK)
    const prevRecentTerms = localItem
      ? (JSON.parse(localItem) as unknown as string[])
      : ([] as string[])

    localStorage.setItem(
      LOCAL_KEY.SEARCH_PICK,
      JSON.stringify([trimTerm, ...prevRecentTerms].slice(0, 5))
    )

    if (options?.isResearch) {
      router.replace(`${pathname}/?term=${trimTerm}`)
    }
    router.push(`${pathname}/?term=${trimTerm}`)
  }

  const showSearchResult = term != null

  return (
    <>
      {showSearchResult ? (
        <div>
          {!searchData ? (
            <div className="relative h-screen w-full">
              <Loading center />
            </div>
          ) : (
            <SearchResult
              term={term}
              keyPoints={searchData.keyPoints}
              onReSearch={(data: { term: string }) => handleSubmit(data, { isResearch: true })}
            />
          )}
        </div>
      ) : (
        <CommonLayout
          title={<span className="lg:text-h3-bold">저장한 pick</span>}
          mobileOptions={{
            hasBackButton: true,
            hasSearch: true,
            fixed: true,
          }}
          searchOptions={{
            placeholder: '노트명, pick 내용을 입력하세요',
            onSubmit: handleSubmit,
            recentTermsLocalKey: LOCAL_KEY.SEARCH_PICK,
          }}
        >
          {isLoading ? (
            <div className="relative h-[80vh] w-full">
              <Loading center />
            </div>
          ) : (
            <>
              {keyPoints?.length ? (
                <div className="mt-[18px] px-[20px] pb-[70px] lg:mt-[48px]">
                  <div className="flex items-center justify-between">
                    {/** TODO: 폴더 별 북마크 */}
                    {/* <CategorySelect categories={categories} /> */}
                    <div className="flex items-center gap-[8px] text-body1-bold text-gray-09">
                      모든 문서
                    </div>
                    <div className="text-text-medium text-gray-06">
                      {keyPoints?.length}개 저장됨
                    </div>
                  </div>
                  <div className="mt-[16px] flex flex-col gap-[24px] lg:grid lg:grid-cols-2 lg:gap-[16px]">
                    {keyPoints?.map((keyPoint) => (
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
