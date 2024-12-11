import { Button } from '@/shared/components/ui/button'
import CollectionSearchList from '../components/collection-search-list'
import SearchList from '../components/search-list'
import Icon from '@/shared/components/custom/icon'
import Link from 'next/link'

interface Props {
  docsQuizLength: number
  collectionLength: number
  previewDocsQuizResults: Partial<Document.SearchedDocument & Quiz.SearchedQuiz>[]
  previewCollectionResults: Collection.SearchedCollection[]
  keyword: string
}

const AllSearchResults = ({
  docsQuizLength,
  collectionLength,
  previewDocsQuizResults,
  previewCollectionResults,
  keyword,
}: Props) => {
  return (
    <div className="flex h-[calc(100dvh-56px-50px)] flex-col gap-[20px] overflow-y-auto text-text1-medium">
      {docsQuizLength > 0 && (
        <div className="flex flex-col">
          <SearchList
            length={docsQuizLength}
            searchResults={previewDocsQuizResults}
            keyword={keyword}
          />

          {/* 퀴즈 노트 전체보기 버튼 : 클릭 시 tab = quiz-note로 변경 */}
          <Link href={`?tab=quiz-note&keyword=${keyword}`} className="mx-[16px]" replace>
            <Button
              variant={'smallSquare'}
              colors={'tertiary'}
              className="h-fit w-full py-[13.5px]"
            >
              퀴즈노트 전체보기
              <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
            </Button>
          </Link>
        </div>
      )}

      {collectionLength > 0 && (
        <div className="flex flex-col">
          <CollectionSearchList
            length={collectionLength}
            searchResults={previewCollectionResults}
          />

          {/* 컬렉션 전체보기 버튼 : : 클릭 시 tab = collection으로 변경 */}
          <Link href={`?tab=collection&keyword=${keyword}`} className="mx-[16px]" replace>
            <Button
              variant={'smallSquare'}
              colors={'tertiary'}
              className="h-fit w-full py-[13.5px]"
            >
              컬렉션 전체보기
              <Icon name="chevron-right" className="size-[16px] text-icon-tertiary" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default AllSearchResults
