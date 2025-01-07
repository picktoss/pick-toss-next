'use client'

import { useState, useRef } from 'react'
import InputWithCancelButton from '@/features/search/components/input-with-cancel-button'
import CollectionSearchList from '@/features/search/components/collection-search-list'
import RecentSearches from '@/features/search/components/recent-searches'
import Text from '@/shared/components/ui/text'

interface Props {
  onSearch?: (keyword: string) => void
}

const SearchCollection = ({ onSearch }: Props) => {
  const [keyword, setKeyword] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [searchResults, setSearchResults] = useState<Collection.SearchedCollection[]>([])

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleDeleteKeyword = () => {
    setKeyword('')
  }

  const handleUpdateKeyword = (selectedKeyword: string) => {
    setKeyword(selectedKeyword)
    setIsSearchFocused(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!keyword.trim()) return
    onSearch?.(keyword)
    // Here you would typically make an API call to search collections
    // For now, we'll just use an empty array as placeholder
    setSearchResults([])
  }

  return (
    <div className="flex h-full w-full flex-col">
      <InputWithCancelButton
        inputValue={keyword}
        onChangeInputValue={handleChangeKeyword}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
        onDeleteKeyword={handleDeleteKeyword}
        onSubmit={handleSubmit}
      />
      {keyword && (
        <CollectionSearchList length={searchResults.length} searchResults={searchResults} />
      )}
      {!keyword && isSearchFocused && (
        <RecentSearches containerRef={searchContainerRef} onUpdateKeyword={handleUpdateKeyword} />
      )}
      {!keyword && !isSearchFocused && (
        <div className="flex flex-col center items-center">
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
