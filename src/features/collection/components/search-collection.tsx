'use client'

import { useState, useRef } from 'react'
import { useSearchCollections } from '@/requests/collection/hooks'
import InputWithCancelButton from '@/features/search/components/input-with-cancel-button'
import CollectionSearchList from '@/features/search/components/collection-search-list'
// import RecentSearches from '@/features/search/components/recent-searches'
import Text from '@/shared/components/ui/text'
import Loading from '@/shared/components/custom/loading'

interface Props {
  onSearch?: (keyword: string) => void
}

const SearchCollection = ({ onSearch }: Props) => {
  const [keyword, setKeyword] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  // const searchContainerRef = useRef<HTMLDivElement>(null)
  const { data: apiSearchResults, isLoading } = useSearchCollections(keyword)

  const searchResults: Collection.SearchedCollection[] =
    apiSearchResults?.collections?.map((collection) => ({
      id: collection.id,
      name: collection.name,
      emoji: collection.emoji,
      bookmarkCount: collection.bookmarkCount,
      collectionCategory: collection.collectionCategory as NonNullable<Collection.Field>,
      memberName: collection.member.creatorName,
      quizCount: collection.totalQuizCount,
    })) ?? []

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleDeleteKeyword = () => {
    setKeyword('')
  }

  // const handleUpdateKeyword = (selectedKeyword: string) => {
  //   setKeyword(selectedKeyword)
  //   setIsSearchFocused(false)
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword.trim()) return
    onSearch?.(keyword)
  }

  return (
    <div className="flex size-full flex-col">
      <InputWithCancelButton
        inputValue={keyword}
        onChangeInputValue={handleChangeKeyword}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        onDeleteKeyword={handleDeleteKeyword}
        onSubmit={handleSubmit}
      />
      {keyword && isLoading && (
        <div className="center mt-8 flex justify-center">
          <Loading center />
        </div>
      )}
      {keyword && !isLoading && searchResults.length > 0 && (
        <CollectionSearchList length={searchResults.length} searchResults={searchResults} />
      )}
      {/* {!keyword && (
        <RecentSearches containerRef={searchContainerRef} onUpdateKeyword={handleUpdateKeyword} />
      )} */}
      {!keyword && (
        <Text typography="text1-medium" color="sub" className="center mt-1">
          검색어를 입력해보세요
        </Text>
      )}
      {keyword && !isLoading && searchResults.length === 0 && (
        <div className="center flex flex-col items-center">
          <Text typography="subtitle1-bold">검색 결과가 없어요</Text>
          <Text typography="text1-medium" color="sub" className="mt-1">
            다른 키워드를 입력해보세요
          </Text>
        </div>
      )}
    </div>
  )
}

export default SearchCollection
