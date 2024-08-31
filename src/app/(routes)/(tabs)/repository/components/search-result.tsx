import { SearchDocumentResponse } from '@/apis/fetchers/document/search-document/fetcher'
import { CommonLayout } from '@/shared/components/common-layout'
import { SearchForm } from '@/shared/components/search-form'
import Link from 'next/link'

interface Props {
  term: string
  documents: SearchDocumentResponse['documents']
  onReSearch: ({ term }: { term: string }) => void
}

export function SearchResult({ term, documents, onReSearch }: Props) {
  return (
    <CommonLayout
      title="노트 검색"
      mobileOptions={{
        hasBackButton: true,
      }}
    >
      <div className="relative min-h-[80vh] pb-[60px]">
        <div className="px-[20px] lg:mt-[28px]">
          <SearchForm
            defaultValue={term}
            onSubmit={onReSearch}
            placeholder="노트명, 노트 내용을 입력하세요"
            className="pb-[12px] pt-[4px] lg:p-0"
          />
        </div>

        {documents.length ? (
          <div className="mt-[20px] px-[20px] lg:mt-[40px]">
            <div className="text-body2-medium text-gray-08">
              검색결과 <span className="text-orange-06">{documents.length}개</span>
            </div>

            <div className="mt-[16px] flex flex-col gap-[24px] lg:grid lg:grid-cols-2 lg:gap-[16px]">
              {documents.map((document) => (
                <Link
                  key={document.documentId}
                  href={`/document/${document.documentId}`}
                  role="button"
                  className="flex h-[160px] w-full flex-col justify-between bg-white p-[20px]"
                >
                  <div>
                    <h4 className="text-text2-bold text-gray-09">
                      {highlight(document.documentName, term)}
                    </h4>
                    <p className="mt-[8px] line-clamp-3 text-text-regular text-gray-08">
                      {document.content}
                    </p>
                  </div>
                  <div className="text-small1-regular text-gray-06">
                    {document.category.name} {'>'} {document.documentName}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <NoResult />
        )}
      </div>
    </CommonLayout>
  )
}

function NoResult() {
  return (
    <div className="center text-center text-text-regular text-gray-09">
      검색 결과가 없습니다
      <br />
      다른 검색어를 입력해보세요
    </div>
  )
}

const highlight = (text: string, term: string) => {
  if (!term) return text
  const parts = text.split(new RegExp(`(${term})`, 'gi'))
  return parts.map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <span key={index} className="text-orange-06">
        {part}
      </span>
    ) : (
      part
    )
  )
}
