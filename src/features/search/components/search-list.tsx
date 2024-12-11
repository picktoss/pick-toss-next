import Text from '@/shared/components/ui/text'
import SearchItem from './search-item'
import { highlightAndTrimText, MarkdownProcessor } from '../utils'

interface Props {
  length: number
  searchResults: Partial<Document.SearchedDocument & Document.SearchedQuiz>[]
  keyword: string
}

const SearchList = ({ length, searchResults, keyword }: Props) => {
  return (
    <>
      <Text>
        퀴즈 노트 <span className="text-text-accent">{length}</span>
      </Text>

      <div className="flex flex-col">
        {searchResults.map((searchItem, idx) => (
          <SearchItem
            key={idx}
            documentId={searchItem.documentId}
            createType={searchItem.documentType as Document.Type}
            documentTitle={highlightAndTrimText(searchItem.documentName ?? '', keyword ?? '')}
            matchingSentence={
              searchItem.content ? (
                <MarkdownProcessor markdownText={searchItem.content} keyword={keyword ?? ''} />
              ) : (
                highlightAndTrimText(
                  searchItem.question ?? 'Q...' + searchItem.answer ?? 'A...',
                  keyword ?? ''
                )
              )
            }
            resultType={searchItem.question ? 'quiz' : 'document'}
            relativeDirectory={
              searchItem.directory ? searchItem.directory.name : searchItem.directoryName ?? ''
            }
            lastItem={idx === searchResults.length - 1}
          />
        ))}
      </div>
    </>
  )
}

export default SearchList
