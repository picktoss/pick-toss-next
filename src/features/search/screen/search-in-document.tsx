'use client'

import { useEffect, useRef, useState } from 'react'
import SearchList from '../components/search-list'
import SearchItem from '../components/search-item'
import RecentSearches from '../components/recent-searches'
import HeaderInDocument from '../components/header-in-document'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { extractPlainText, highlightAndTrimText } from '../utils'
import Text from '@/shared/components/ui/text'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Loading from '@/shared/components/custom/loading'
import { Form, FormField } from '@/shared/components/ui/form'
import { useRecentSearches } from '../hook/use-recent-searches'

const searchSchema = z.object({
  keyword: z.string().trim().nonempty('검색어를 입력해주세요.'),
})
type SearchFormValues = z.infer<typeof searchSchema>

// 퀴즈노트 탭 내 검색창 화면
const SearchInDocument = () => {
  const router = useRouter()
  const keyword = useSearchParams().get('keyword') ?? ''

  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { searches, saveRecentSearches, deleteRecentSearch, clearRecentSearches } =
    useRecentSearches()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const { data, isPending } = useQuery(queries.document.search({ keyword }))
  const searchResults = [...(data?.documents ?? []), ...(data?.quizzes ?? [])] as Partial<
    Document.SearchedDocument & Document.SearchedQuiz
  >[]

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: keyword ?? '',
    },
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !searchInputRef.current?.contains(e.target as Node) &&
        !searchContainerRef.current?.contains(e.target as Node)
      ) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /** 최근 검색어 리스트에서 특정 검색어 클릭 시 검색창에 키워드가 반영되도록하는 함수 */
  const handleUpdateKeyword = (keyword: string) => {
    form.setValue('keyword', keyword)
    searchInputRef.current?.focus()
  }

  /** 검색창에 입력되어있는 키워드를 삭제하는 함수 */
  const handleDeleteKeyword = () => {
    form.setValue('keyword', '')
    router.push('/document/search')
  }

  const onSubmit = (data: SearchFormValues) => {
    const keyword = data.keyword

    saveRecentSearches(keyword)

    searchInputRef.current?.blur()
    setIsSearchFocused(false)

    router.push(`?keyword=${keyword}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <HeaderInDocument
              field={field}
              searchInputRef={searchInputRef}
              isSearchFocused={isSearchFocused}
              setIsSearchFocused={setIsSearchFocused}
              onDeleteKeyword={handleDeleteKeyword}
            />
          )}
        />

        <main>
          {/* input 클릭 시 나타날 최근 검색어 */}
          {isSearchFocused && (
            <FormField
              control={form.control}
              name="keyword"
              render={() => (
                <RecentSearches
                  searches={searches}
                  onClearSearches={clearRecentSearches}
                  onDeleteSearchItem={deleteRecentSearch}
                  containerRef={searchContainerRef}
                  onUpdateKeyword={handleUpdateKeyword}
                />
              )}
            />
          )}

          {isPending && <Loading center />}

          {!isSearchFocused &&
            // 검색 결과 X
            (!data || searchResults.length === 0 ? (
              <div className="flex-center h-[calc(100dvh-88px-56px)] flex-col">
                <Text typography="subtitle1-bold">검색결과가 없습니다</Text>
                <Text typography="text1-medium" className="text-text-sub">
                  다른 키워드를 입력해보세요
                </Text>
              </div>
            ) : (
              // 검색 결과 O : 검색 결과 리스트
              data &&
              searchResults.length > 0 && (
                <SearchList length={searchResults.length}>
                  {searchResults.map((searchItem, idx) => (
                    <SearchItem
                      key={idx}
                      createType={idx % 2 === 0 ? 'FILE' : 'TEXT'} // type 들어가야함
                      documentTitle={searchItem.documentName ?? ''}
                      matchingSentence={
                        searchItem.content ? (
                          <MarkdownProcessor markdownText={searchItem.content} keyword={keyword} />
                        ) : (
                          highlightAndTrimText(
                            searchItem.question ?? 'Q...' + searchItem.answer ?? 'A...',
                            keyword
                          )
                        )
                      }
                      resultType={searchItem.question ? 'quiz' : 'document'}
                      relativeDirectory={
                        searchItem.directory
                          ? searchItem.directory.name
                          : searchItem.directoryName ?? ''
                      }
                      lastItem={idx === searchResults.length - 1}
                    />
                  ))}
                </SearchList>
              )
            ))}
        </main>
      </form>
    </Form>
  )
}

export default SearchInDocument

/** 마크다운 텍스트를 받아
 * 문법을 제거하고 키워드에 강조를 해서 반환하는 함수
 */
const MarkdownProcessor = ({
  markdownText,
  keyword,
}: {
  markdownText: string
  keyword: string
}) => {
  const plainText = extractPlainText(markdownText)
  const highlightedText = highlightAndTrimText(plainText, keyword)

  return <div>{highlightedText}</div>
}
