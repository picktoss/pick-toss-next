import Loading from '@/shared/components/loading'
import SearchResult from './search-result'
import { useQuery } from '@tanstack/react-query'
import { queries } from '@/shared/lib/tanstack-query/query-keys'

export interface RepositoryProps {
  term: string
  handleSubmit: (
    data: {
      term: string
    },
    options?: {
      isResearch: boolean
    }
  ) => void
}

// RenderSearchResult 컴포넌트
const RenderSearchResult = ({ term, handleSubmit }: RepositoryProps) => {
  const { data: searchData, isLoading } = useQuery(queries.document.search(term))

  return (
    <div>
      {isLoading ? (
        <div className="relative h-screen w-full">
          <Loading center />
        </div>
      ) : searchData ? (
        <SearchResult
          term={term}
          documents={searchData.documents}
          onReSearch={(data: { term: string }) => handleSubmit(data, { isResearch: true })}
        />
      ) : (
        // searchData가 없을 경우 처리
        <div className="relative flex h-screen w-full items-center justify-center">
          <p>서버에서 데이터를 가져오지 못했습니다.</p>
        </div>
      )}
    </div>
  )
}

export default RenderSearchResult
