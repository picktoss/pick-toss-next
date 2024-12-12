import Collection from '@/features/collection/components/collection'
import Text from '@/shared/components/ui/text'

/* eslint-disable @typescript-eslint/no-unused-vars */
interface Props {
  length: number
  searchResults: Collection.SearchedCollection[]
}

const CollectionSearchList = ({ length, searchResults }: Props) => {
  return (
    <div className="flex flex-col p-[16px]">
      <Text>
        컬렉션 <span className="text-text-accent">{length}</span>
      </Text>

      <div className="mb-[24px] mt-[20px] grid grid-cols-2 gap-[11px]">
        {searchResults.map((collectionItem) => (
          <Collection
            key={collectionItem.id}
            collectionId={collectionItem.id}
            emoji={collectionItem.emoji}
            title={collectionItem.name}
            category={collectionItem.collectionCategory}
            problemCount={collectionItem.quizCount}
            bookMarkCount={collectionItem.bookmarkCount}
            creatorName={collectionItem.memberName}
            lastUpdated={''}
            className="rounded-[16px] border border-border-default"
          />
        ))}
      </div>
    </div>
  )
}

export default CollectionSearchList
