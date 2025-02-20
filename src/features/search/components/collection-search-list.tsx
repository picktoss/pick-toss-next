import Collection from '@/features/collection/components/collection'
import Text from '@/shared/components/ui/text'
import Link from 'next/link'

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
          <Link key={collectionItem.id} href={`/collections/${collectionItem.id}`}>
            <Collection
              key={collectionItem.id}
              collectionId={collectionItem.id}
              emoji={collectionItem.emoji}
              title={collectionItem.name}
              category={collectionItem.collectionCategory}
              problemCount={collectionItem.quizCount}
              bookMarkCount={collectionItem.bookmarkCount}
              creatorName={collectionItem.memberName}
              isOwner
              className="rounded-[16px] border border-border-default"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CollectionSearchList
