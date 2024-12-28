'use client'

import { ChangeEvent } from 'react'
import DocumentQuizSearchList from '../components/document-quiz-search-list'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'
import Loading from '@/shared/components/custom/loading'
import usePreviousPath from '@/shared/hooks/use-previous-path'
import SearchTabController from '../components/search-tab-controller'
import NoResults from './no-results'
import AllSearchResults from './all-search-results'
import CollectionSearchList from '../components/collection-search-list'
import { useSearch } from '../hooks/use-search'
import SearchHeader from '../components/search-header'
import { SEARCH_TABS } from '../config'

export type SearchTab = 'all' | 'quiz-note' | 'collection'

const IntegratedSearch = () => {
  const searchParams = useSearchParams()
  const tab = (searchParams.get('tab') || 'all') as SearchTab

  usePreviousPath()
  const {
    initialKeyword,
    keyword,
    setKeyword,
    isSearchFocused,
    setIsSearchFocused,
    searchInputRef,
    searchContainerRef,
    handleDeleteKeyword,
    handleSubmit,
    handleUpdateKeyword,
  } = useSearch()

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
  const isEmptyList = searchResultsInQuizNote.length === 0 && searchResultsInCollection.length === 0

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onDeleteKeyword = () => {
    handleDeleteKeyword('/search' + `?tab=${tab}`)
  }

  const onUpdateKeyword = (keyword: string) => {
    handleUpdateKeyword(keyword, `?tab=${tab}` + `&keyword=${keyword}`)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, `?tab=${tab}` + `&keyword=${keyword}`)
  }

  const tabContentMap = {
    [SEARCH_TABS.ALL]: () => (
      <AllSearchResults
        docsQuizLength={DocsQuizResultsLength}
        collectionLength={CollectionResultsLength}
        previewDocsQuizResults={searchResultsInQuizNote.slice(0, 3)}
        previewCollectionResults={searchResultsInCollection.slice(0, 4)}
        keyword={keyword}
      />
    ),
    [SEARCH_TABS.QUIZ_NOTE]: () =>
      DocsQuizResultsLength > 0 ? (
        <div className="h-[calc(100dvh-56px-50px)] overflow-y-auto text-text1-medium">
          <DocumentQuizSearchList
            length={DocsQuizResultsLength}
            searchResults={searchResultsInQuizNote}
            keyword={keyword}
          />
        </div>
      ) : (
        <NoResults className="h-[calc(100dvh-56px-50px)]" />
      ),
    [SEARCH_TABS.COLLECTION]: () =>
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
  }

  return (
    <div>
      <SearchHeader
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
        handleDeleteKeyword={onDeleteKeyword}
        handleSubmit={onSubmit}
        handleUpdateKeyword={onUpdateKeyword}
        searchContainerRef={searchContainerRef}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      {isPending && <Loading center />}

      {!isSearchFocused && (
        <>
          <SearchTabController />

          {!data || isEmptyList ? (
            // 검색 결과 X
            <NoResults className="h-[calc(100dvh-56px-50px)]" />
          ) : (
            // 검색 결과 O
            // tab에 따라 다른 view 렌더링
            data && tabContentMap[tab]()
          )}
        </>
      )}
    </div>
  )
}

export default IntegratedSearch
