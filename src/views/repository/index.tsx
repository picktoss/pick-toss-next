import { SearchDocumentResponse } from '@/actions/fetchers/document/search-document'
import { Session } from 'next-auth'
import RenderSearchResult from './components/render-search-result'
import RenderRepository from './components/render-repository'

export interface Props {
  searchData: SearchDocumentResponse | undefined
  term: string | null
  handleSubmit: (
    data: {
      term: string
    },
    options?: {
      isResearch: boolean
    }
  ) => void
  session: Session | null
}

export default function ViewRepository({ searchData, term, handleSubmit, session }: Props) {
  return (
    <>
      {term != null ? (
        <RenderSearchResult searchData={searchData} term={term} handleSubmit={handleSubmit} />
      ) : (
        <RenderRepository session={session} handleSubmit={handleSubmit} />
      )}
    </>
  )
}
