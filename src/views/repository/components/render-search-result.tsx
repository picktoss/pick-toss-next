import Loading from '@/shared/components/loading'
import { ViewRepositoryProps } from '..'
import { SearchResult } from './search-result'

export default function RenderSearchResult({
  searchData,
  term,
  handleSubmit,
}: Omit<ViewRepositoryProps, 'showSearchResult' | 'session'>) {
  return (
    <div>
      {!searchData ? (
        <div className="relative h-screen w-full">
          <Loading center />
        </div>
      ) : (
        <SearchResult
          term={term!}
          documents={searchData.documents}
          onReSearch={(data: { term: string }) => handleSubmit(data, { isResearch: true })}
        />
      )}
    </div>
  )
}
