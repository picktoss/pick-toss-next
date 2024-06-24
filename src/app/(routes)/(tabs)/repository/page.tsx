'use client'

import Image from 'next/image'

import CategoryList from './components/category-list'
import { CommonLayout } from '@/components/common-layout'
import { useSession } from 'next-auth/react'
import CategoryAccordionList from './components/category-accordion-list'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { searchDocument } from '@/apis/fetchers/document/search-document'
import Loading from '@/components/loading'
import { SearchResult } from './components/search-result'

export default function Repository() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const term = useSearchParams().get('term')

  const { data: searchData } = useQuery({
    queryKey: ['search-document', term],
    queryFn: () =>
      searchDocument({
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
              documents={searchData.documents}
              onReSearch={({ term }: { term: string }) => {
                router.push(`${pathname}/?term=${term}`)
              }}
            />
          )}
        </div>
      ) : (
        <CommonLayout
          title={
            <div className="flex gap-[8px]">
              <span>{session?.user.dto.name}님의 노트 창고</span>
              <Image src="/icons/book.svg" alt="" width={32} height={32} />
            </div>
          }
          mobileOptions={{
            hasSearch: true,
            hasNotifications: true,
            mobileTitle: (
              <div className="flex gap-[8px]">
                <span>노트 창고</span>
                <Image src="/icons/book.svg" alt="" width={24} height={24} />
              </div>
            ),
          }}
          searchOptions={{
            placeholder: '노트명, 노트 내용을 입력하세요',
            recentTerms: ['식물기반 단백질', '제품', '최근 이슈'],
            onSubmit: ({ term }) => {
              router.push(`${pathname}/?term=${term}`)
            },
          }}
        >
          {/* TODO: height calc 계산보다 더 나은 방식(상대적인 height 계산) 필요 */}
          <main className="mt-[28px] flex h-[calc(100vh-160px)] flex-col lg:mt-[40px]">
            <CategoryList className="px-[20px]" />

            <div className="mt-[40px] w-full flex-1 overflow-hidden rounded-t-[20px] bg-white p-[20px] lg:hidden">
              <h3 className="mb-[20px] text-h4-bold text-gray-09">노트</h3>
              <CategoryAccordionList className="h-[90%] overflow-auto" />
            </div>
          </main>
        </CommonLayout>
      )}
    </>
  )
}
