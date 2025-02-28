import Text from '@/shared/components/ui/text'
import SearchItem from './search-item'
import { highlightAndTrimText, MarkdownProcessor } from '../utils'

interface Props {
  length: number
  searchResults: Partial<Document.SearchedDocument & Document.SearchedQuiz>[]
  keyword: string
}

const DocumentQuizSearchList = ({ length, searchResults, keyword }: Props) => {
  return (
    <div className="flex flex-col p-[16px]">
      <Text>
        퀴즈 노트 <span className="text-text-accent">{length}</span>
      </Text>

      <div className="flex flex-col">
        {searchResults.map((searchItem, idx) => (
          <SearchItem
            key={idx}
            documentId={searchItem.documentId || null}
            createType={searchItem.documentType as Document.Type}
            documentTitle={highlightAndTrimText(searchItem.documentName ?? '', keyword ?? '')}
            matchingSentence={
              searchItem.content ? (
                // 문서 결과
                <MarkdownProcessor markdownText={searchItem.content} keyword={keyword ?? ''} />
              ) : (
                // 퀴즈 결과
                highlightAndTrimText(
                  `Q.${searchItem.question ?? '...'} A.${
                    (searchItem.answer === 'correct'
                      ? 'O'
                      : searchItem.answer === 'incorrect'
                      ? 'X'
                      : searchItem.answer) ?? '...'
                  }`,
                  keyword ?? ''
                )
              )
            }
            resultType={searchItem.question ? 'quiz' : 'document'}
            relativeDirectory={
              searchItem.directory
                ? searchItem.directory.name === '기본 폴더'
                  ? '전체 노트'
                  : searchItem.directory.name
                : searchItem.directoryName ?? ''
            }
            lastItem={idx === searchResults.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

export default DocumentQuizSearchList
