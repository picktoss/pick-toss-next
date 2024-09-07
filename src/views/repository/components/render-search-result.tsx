import Loading from '@/shared/components/loading'
import { SearchResult } from './search-result'
import { useQuery } from '@tanstack/react-query'
import { searchDocument } from '@/actions/fetchers/document'

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

export default function RenderSearchResult({ term, handleSubmit }: RepositoryProps) {
  const { data: searchData, isLoading } = useQuery({
    queryKey: ['search-document', term],
    queryFn: () =>
      searchDocument({
        term: term ?? '',
      }),
    enabled: term != null,
  })

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
