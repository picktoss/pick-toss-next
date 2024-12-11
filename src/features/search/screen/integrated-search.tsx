'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import SearchList from '../components/search-list'
import RecentSearches from '../components/recent-searches'
import HeaderInDocument from '../components/header-in-document'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Loading from '@/shared/components/custom/loading'
import { RECENT_SEARCHES } from '../config'
import { getLocalStorage, setLocalStorage } from '@/shared/utils/storage'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import SearchTabController from '../components/search-tab-controller'
import { SwitchCase } from '@/shared/components/custom/react/switch-case'
import NoResults from './no-results'
import AllSearchResults from './all-search-results'
import CollectionSearchList from '../components/collection-search-list'

export type SearchTab = 'all' | 'quiz-note' | 'collection'

const IntegratedSearch = () => {
  usePreviousPath()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialKeyword = searchParams.get('keyword') || ''
  const tab = searchParams.get('tab') || ('all' as SearchTab)

  const [keyword, setKeyword] = useState(initialKeyword)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  const { data, isPending } = useQuery(queries.search.integrated({ keyword: initialKeyword }))
  const searchResultsInQuizNote = [...(data?.documents ?? []), ...(data?.quizzes ?? [])] as Partial<
    Document.SearchedDocument & Quiz.SearchedQuiz
  >[]
  const searchResultsInCollection = [
    ...(data?.collections ?? []),
  ] as Collection.SearchedCollection[]

  // 테스트용
  // const searchResultsInCollection = mockCollectionList

  const DocsQuizResultsLength = searchResultsInQuizNote.length
  const CollectionResultsLength = searchResultsInCollection.length

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

  // 검색 후 반영
  useEffect(() => {
    if (!initialKeyword) return

    const storageSearches = getLocalStorage<string[]>(RECENT_SEARCHES) ?? []
    const newSearches = [
      initialKeyword,
      ...storageSearches.filter((search) => search !== initialKeyword),
    ].slice(0, 5)
    setLocalStorage(RECENT_SEARCHES, newSearches)
  }, [initialKeyword])

  /** 최근 검색어 리스트에서 특정 검색어 클릭 시 검색창에 키워드가 반영되도록하는 함수 */
  const handleUpdateKeyword = (selectedKeyword: string) => {
    setKeyword(selectedKeyword)
    searchInputRef.current?.focus()
  }

  /** 검색창에 입력되어있는 키워드를 삭제하는 함수 */
  const handleDeleteKeyword = () => {
    setKeyword('')
    router.replace('/search' + `?tab=${tab}`)
  }

  // 검색
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.')
      return
    }

    router.replace(`?tab=${tab}` + `&keyword=${keyword}`)
    searchInputRef.current?.blur()
    setIsSearchFocused(false)
  }

  return (
    <div>
      <HeaderInDocument
        inputValue={keyword}
        onChangeInputValue={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        onDeleteKeyword={handleDeleteKeyword}
        onSubmit={handleSubmit}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      <main>
        {/* input 클릭 시 나타날 최근 검색어 */}
        {isSearchFocused && (
          <RecentSearches containerRef={searchContainerRef} onUpdateKeyword={handleUpdateKeyword} />
        )}

        {isPending && <Loading center />}

        {!isSearchFocused && (
          <>
            <SearchTabController />

            {
              // 검색 결과 X
              !data ||
              (searchResultsInQuizNote.length === 0 && searchResultsInCollection.length === 0) ? (
                <NoResults className="h-[calc(100dvh-56px-50px)]" />
              ) : (
                data && (
                  // 검색 결과 O
                  // tab에 따라 다른 view 렌더링
                  <SwitchCase
                    value={tab}
                    caseBy={{
                      all: (
                        <AllSearchResults
                          docsQuizLength={DocsQuizResultsLength}
                          collectionLength={CollectionResultsLength}
                          previewDocsQuizResults={searchResultsInQuizNote.slice(0, 3)}
                          previewCollectionResults={searchResultsInCollection.slice(0, 4)}
                          keyword={initialKeyword}
                        />
                      ),

                      'quiz-note':
                        DocsQuizResultsLength > 0 ? (
                          <div className="h-[calc(100dvh-56px-50px)] overflow-y-auto text-text1-medium">
                            <SearchList
                              length={DocsQuizResultsLength}
                              searchResults={searchResultsInQuizNote}
                              keyword={initialKeyword}
                            />
                          </div>
                        ) : (
                          <NoResults className="h-[calc(100dvh-56px-50px)]" />
                        ),

                      collection:
                        CollectionResultsLength > 0 ? (
                          <div className="h-[calc(100dvh-56px-50px)] overflow-y-auto text-text1-medium">
                            <CollectionSearchList
                              length={CollectionResultsLength}
                              searchResults={searchResultsInCollection}
                            />
                          </div>
                        ) : (
                          <NoResults className="h-[calc(100dvh-56px-50px)]" />
                        ),
                    }}
                  />
                )
              )
            }
          </>
        )}
      </main>
    </div>
  )
}

export default IntegratedSearch
