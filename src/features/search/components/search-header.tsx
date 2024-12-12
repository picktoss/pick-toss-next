import InputWithCancelButton from './input-with-cancel-button'
import RecentSearches from './recent-searches'

interface Props {
  keyword: string
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDeleteKeyword: () => void
  handleUpdateKeyword: (selectedKeyword: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  searchInputRef: React.RefObject<HTMLInputElement>
  searchContainerRef: React.RefObject<HTMLDivElement>
  isSearchFocused: boolean
  setIsSearchFocused: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchHeader = ({
  keyword,
  onChangeKeyword,
  handleUpdateKeyword,
  handleDeleteKeyword,
  handleSubmit,
  searchContainerRef,
  searchInputRef,
  isSearchFocused,
  setIsSearchFocused,
}: Props) => {
  return (
    <>
      <InputWithCancelButton
        inputValue={keyword}
        onChangeInputValue={onChangeKeyword}
        onDeleteKeyword={handleDeleteKeyword}
        onSubmit={handleSubmit}
        searchInputRef={searchInputRef}
        isSearchFocused={isSearchFocused}
        setIsSearchFocused={setIsSearchFocused}
      />

      {/* input 클릭 시 나타날 최근 검색어 */}
      {isSearchFocused && (
        <RecentSearches containerRef={searchContainerRef} onUpdateKeyword={handleUpdateKeyword} />
      )}
    </>
  )
}

export default SearchHeader
